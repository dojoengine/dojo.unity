using System;
using System.Net;
using System.Text;
using System.Threading;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace Dojo
{
    public class CartridgeBrowserConnect : MonoBehaviour
    {
        #region JWT_CALLBACK

        [Header("Simple JWT Callback")]
        [Tooltip("URL to encode with callback")] public string encodeUrl = "https://x.cartridge.gg/slot?callback_uri=";
        [Tooltip("Local callback URL for HTTP listener")] public string callbackUrl = "http://localhost:8080/callback/";

        private HttpListener httpListener; // HTTP server for local callback
        private Thread listenerThread;     // Thread for handling HTTP requests
        private ManualResetEvent callbackProcessed = new ManualResetEvent(false); // Signal to gracefully stop after processing callback

        /// <summary>
        /// Launches the web browser and starts the HTTP server to listen for the callback.
        /// </summary>
        public void LaunchWebBrowser()
        {
            StartHttpServer();

            // Encode the callback URL and open the web page
            string webPageUrl = encodeUrl + Uri.EscapeDataString(callbackUrl);
            Application.OpenURL(webPageUrl);
        }

        /// <summary>
        /// Initializes and starts the HTTP listener.
        /// </summary>
        private void StartHttpServer()
        {
            callbackProcessed.Reset(); // Ensure the signal is not set
            httpListener = new HttpListener();
            httpListener.Prefixes.Add(callbackUrl);
            httpListener.Start();

            // Start a new thread to handle incoming connections
            listenerThread = new Thread(HandleIncomingConnections);
            listenerThread.Start();
        }

        /// <summary>
        /// Handles incoming HTTP requests and processes the JWT callback.
        /// </summary>
        private void HandleIncomingConnections()
        {
            try
            {
                while (httpListener.IsListening && !callbackProcessed.WaitOne(0)) // Stop when callback is processed
                {
                    try
                    {
                        // Wait for an HTTP request
                        var context = httpListener.GetContext();

                        // Extract query parameters from the request URL
                        string requestQuery = context.Request.Url.Query;
                        Log("Received JWT callback query: " + requestQuery);

                        var queryParams = System.Web.HttpUtility.ParseQueryString(requestQuery);
                        string code = queryParams["code"];

                        if (!string.IsNullOrEmpty(code))
                        {
                            // Decode the JWT payload to extract user data
                            string decodedPayload = DecodeJwtPayload(code);
                            if (!string.IsNullOrEmpty(decodedPayload))
                            {
                                Log("Decoded JWT Payload: " + decodedPayload);

                                var payloadJson = JObject.Parse(decodedPayload);
                                // You can add extra TryGetValues related to the desired payload info
                                if (payloadJson.TryGetValue("user_id", out var userIdJson))
                                {
                                    string userId = userIdJson.ToString();
                                    Log("User ID from JWT: " + userId);
                                }
                            }
                        }

                        // Send an HTML response to the client
                        string responseString = "<html><body>Thank you! You may now return to the game.</body></html>";
                        byte[] buffer = Encoding.UTF8.GetBytes(responseString);

                        context.Response.ContentLength64 = buffer.Length;
                        context.Response.OutputStream.Write(buffer, 0, buffer.Length);
                        context.Response.OutputStream.Close();

                        // Signal that the callback has been processed
                        callbackProcessed.Set();
                    }
                    catch (HttpListenerException ex)
                    {
                        LogError($"HttpListener exception: {ex.Message}");
                    }
                }
            }
            catch (Exception e)
            {
                LogError($"Error in HTTP server: {e.Message}");
            }
            finally
            {
                StopHttpServer(); // Ensure cleanup after the callback
            }
        }

        /// <summary>
        /// Stops the HTTP listener and cleans up resources.
        /// </summary>
        private void StopHttpServer()
        {
            try
            {
                if (httpListener != null)
                {
                    httpListener.Stop();
                    httpListener.Close();
                    httpListener = null;
                }

                if (listenerThread != null && listenerThread.IsAlive)
                {
                    listenerThread.Join(500); // Wait up to 500ms for the thread to terminate
                    listenerThread = null;
                }
            }
            catch (Exception ex)
            {
                LogError($"Error stopping HTTP server: {ex.Message}");
            }
        }

        /// <summary>
        /// Stops the HTTP listener and cleans up resources when the application quits.
        /// </summary>
        private void OnApplicationQuit()
        {
            StopHttpServer();
        }

        /// <summary>
        /// Decodes the payload (middle section) of a JWT.
        /// </summary>
        /// <param name="jwt">The JWT string to decode.</param>
        /// <returns>The decoded payload as a JSON string, or null if decoding fails.</returns>
        private string DecodeJwtPayload(string jwt)
        {
            try
            {
                // JWT is split into three parts: header, payload, and signature
                string[] parts = jwt.Split('.');
                if (parts.Length < 2)
                {
                    LogError("Invalid JWT format.");
                    return null;
                }

                // Decode the payload (middle part)
                string payload = parts[1];
                byte[] decodedBytes = Convert.FromBase64String(PadBase64String(payload));
                return Encoding.UTF8.GetString(decodedBytes);
            }
            catch (Exception ex)
            {
                LogError("Error decoding JWT: " + ex.Message);
                return null;
            }
        }

        /// <summary>
        /// Pads a Base64 string to ensure it has valid Base64 padding.
        /// </summary>
        /// <param name="base64">The Base64 string to pad.</param>
        /// <returns>A properly padded Base64 string.</returns>
        private string PadBase64String(string base64)
        {
            return base64.PadRight(base64.Length + (4 - base64.Length % 4) % 4, '=');
        }

        /// <summary>
        /// Logs messages to the console. Replace with production logging if necessary.
        /// </summary>
        /// <param name="message">The message to log.</param>
        private void Log(string message)
        {
            Debug.Log(message);
        }

        /// <summary>
        /// Logs error messages to the console. Replace with production error logging if necessary.
        /// </summary>
        /// <param name="message">The error message to log.</param>
        private void LogError(string message)
        {
            Debug.LogError(message);
        }

        #endregion
    }
}
