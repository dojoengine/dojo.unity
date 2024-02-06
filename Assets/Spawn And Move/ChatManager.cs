using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Dojo;
using Dojo.Starknet;
using Dojo.Torii;
using dojo_bindings;
using UnityEngine;
using UnityEngine.UI;

public class ChatManager : MonoBehaviour
{
    public bool chatOpen = false;

    public WorldManager worldManager;

    private Transform chatScrollView;
    private TMPro.TMP_InputField chatInput;

    [SerializeField] GameManagerData gameManagerData; 

    // Start is called before the first frame update
    async void Start()
    {
        await worldManager.Subscribe("chat");
        ToriiEvents.Instance.OnMessage += OnMessage;

        chatInput = GetComponentInChildren<TMPro.TMP_InputField>(true);
        chatInput.gameObject.SetActive(false);

        chatScrollView = transform.Find("Scroll View/Viewport/Content");
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyUp(KeyCode.T))
        {
            chatInput.gameObject.SetActive(true);
            chatInput.GetComponent<TMPro.TMP_InputField>().ActivateInputField();
            chatOpen = true;
        }

        // chat interactions below
        if (!chatOpen) return;
        // if we press enter, send message
        if (Input.GetKeyUp(KeyCode.Return))
        {
            SendMessage("chat", chatInput.text);
            chatInput.gameObject.SetActive(false);
            chatInput.text = "";
            chatOpen = false;
        }

        // if press esc. close chat
        if (Input.GetKeyUp(KeyCode.Escape))
        {
            chatInput.gameObject.SetActive(false);
            chatInput.text = "";
            chatOpen = false;
        }
    }

    void OnMessage(string propagationSource, string source, string messageId, string topic, byte[] data)
    {
        // add to scroll view
        var message = System.Text.Encoding.UTF8.GetString(data.Skip(32).ToArray());

        var text = chatScrollView.GetComponent<TMPro.TextMeshProUGUI>();
        // format the message
        // author: message
        // first 32 bytes are the wallet address of the author
        var authorAddressBytes = data.Take(32).ToArray();
        var authorAddress = new FieldElement(authorAddressBytes).Hex();
        // only show the first 6 characters of the address (ignoring 0x)
        var authorName = authorAddress.Substring(0, 8);
        text.text += $"{authorName}: {message}\n";

        var scrollRect = chatScrollView.parent.parent.GetComponent<ScrollRect>();

        scrollRect.velocity = new Vector2(0, 1000);
    }

    async void SendMessage(string topic, string message)
    {
        var bytes = System.Text.Encoding.UTF8.GetBytes(message);
        // first 32 bytes are the wallet address of the author
        // remaining bytes is the message content
        var authorAddressBytes = new FieldElement(gameManagerData.masterAddress).Inner().data.ToArray().ToList();
        var messageBytes = authorAddressBytes.Concat(bytes).ToArray();
        await worldManager.Publish(topic, messageBytes);
    }
}
