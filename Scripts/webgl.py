import http.server
import ssl
import argparse
import os
import tempfile
import subprocess
import shutil

# Server settings
HOST = "localhost"

def find_mkcert():
    mkcert_path = shutil.which("mkcert")
    if not mkcert_path:
        print("Error: mkcert command not found. Please ensure mkcert is installed and in your system PATH.")
        print("You can install it from https://mkcert.dev/ and then run 'mkcert -install'.")
        return None
    return mkcert_path

def run_mkcert(mkcert_path, cert_file_path, key_file_path):
    try:
        print(f"Running mkcert to generate certificate for {HOST}...")
        print(f"  Certificate will be: {cert_file_path}")
        print(f"  Key will be: {key_file_path}")
        # Note: mkcert might show its own output here
        process = subprocess.run(
            [mkcert_path, "-cert-file", cert_file_path, "-key-file", key_file_path, HOST],
            capture_output=True, text=True, check=True
        )
        print("mkcert executed successfully.")
        if process.stdout:
            print("mkcert stdout:", process.stdout)
        if process.stderr:
            print("mkcert stderr:", process.stderr)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error running mkcert: {e}")
        print(f"mkcert stdout: {e.stdout}")
        print(f"mkcert stderr: {e.stderr}")
        print("Please ensure you have run 'mkcert -install' previously to set up a local CA.")
        return False
    except FileNotFoundError:
        # This case should be caught by find_mkcert, but as a safeguard:
        print("Error: mkcert command not found during execution. This shouldn't happen if find_mkcert worked.")
        return False

def main():
    parser = argparse.ArgumentParser(description='HTTPS server using mkcert for on-the-fly certificate generation')
    parser.add_argument('--port', '-p', type=int, default=8443, help='Port to serve on (default: 8443)')
    parser.add_argument('--directory', '-d', type=str, default='.', help='Directory to serve files from (default: current directory)')
    args = parser.parse_args()

    PORT = args.port
    DIRECTORY = args.directory

    mkcert_path = find_mkcert()
    if not mkcert_path:
        exit(1)

    # Change to the specified directory
    if not os.path.isdir(DIRECTORY):
        print(f"Error: Directory '{DIRECTORY}' not found.")
        exit(1)
    original_cwd = os.getcwd()
    os.chdir(DIRECTORY)

    # Create temporary files for cert and key
    # We use NamedTemporaryFile to get names, mkcert writes to these names.
    # delete=False is important so mkcert can write to them; we clean up manually.
    cert_temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='-cert.pem')
    key_temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='-key.pem')
    
    cert_file_path = cert_temp_file.name
    key_file_path = key_temp_file.name
    
    # Close the files immediately so mkcert can write to them without file locking issues.
    cert_temp_file.close()
    key_temp_file.close()

    server_instance = None # To ensure server_close is called if server object exists

    try:
        if not run_mkcert(mkcert_path, cert_file_path, key_file_path):
            exit(1)

        # Create a simple HTTP server
        # We need to be in the target DIRECTORY for SimpleHTTPRequestHandler to serve correctly
        server_instance = http.server.HTTPServer((HOST, PORT), http.server.SimpleHTTPRequestHandler)

        # Load SSL context
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        print(f"Loading generated certificate from: {cert_file_path}")
        print(f"Loading generated key from: {key_file_path}")
        context.load_cert_chain(certfile=cert_file_path, keyfile=key_file_path)

        # Wrap the server socket with SSL
        server_instance.socket = context.wrap_socket(server_instance.socket, server_side=True)

        print(f"Serving HTTPS on https://{HOST}:{PORT}/ from directory: {os.path.abspath(DIRECTORY)}")
        print("Using mkcert-generated temporary certificate.")
        print("Note: Your browser will only trust this if you have run 'mkcert -install' previously.")
        server_instance.serve_forever()

    except ssl.SSLError as e:
        print(f"SSL Error: {e}")
        print("This might be due to an issue with the certificate/key files or their format.")
        print("If mkcert ran but you still see errors, ensure 'mkcert -install' was successful and your system trusts the mkcert local CA.")
    except FileNotFoundError:
        # This might occur if the temp files were somehow deleted between mkcert running and load_cert_chain
        print("Error: Temporary certificate or key file not found unexpectedly.")
    except KeyboardInterrupt:
        print("\nShutting down server...")
    finally:
        if server_instance:
            server_instance.server_close()
        
        # Clean up temporary files
        print(f"Cleaning up temporary file: {cert_file_path}")
        if os.path.exists(cert_file_path):
            os.remove(cert_file_path)
        print(f"Cleaning up temporary file: {key_file_path}")
        if os.path.exists(key_file_path):
            os.remove(key_file_path)
        
        os.chdir(original_cwd) # Restore original CWD

if __name__ == "__main__":
    main()