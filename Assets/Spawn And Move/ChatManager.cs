using System;
using System.Collections;
using System.Collections.Generic;
using Dojo;
using Dojo.Torii;
using UnityEngine;
using UnityEngine.UI;

public class ChatManager : MonoBehaviour
{
    public bool chatOpen = false;

    public WorldManager worldManager;

    private Transform chatScrollView;
    private TMPro.TMP_InputField chatInput;

    // Start is called before the first frame update
    void Start()
    {
        worldManager.toriiClient.SubscribeTopic("chat");
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

    void OnMessage(string propagationSource, string source, string messageId, string topic, byte[] data) {
        // add to scroll view
        var message = System.Text.Encoding.UTF8.GetString(data);

        var text = chatScrollView.GetComponent<TMPro.TextMeshProUGUI>();  
        text.text += message + "\n";

        var scrollRect = chatScrollView.parent.parent.GetComponent<ScrollRect>();

        scrollRect.velocity = new Vector2(0, 1000);
    }

    void SendMessage(string topic, string message) {
        var bytes = System.Text.Encoding.UTF8.GetBytes(message);
        worldManager.toriiClient.PublishMessage(topic, bytes);
    }
}
