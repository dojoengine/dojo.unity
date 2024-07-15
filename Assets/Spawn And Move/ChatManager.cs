using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using Dojo;
using Dojo.Starknet;
using Dojo.Torii;
using dojo_bindings;
using dojo_examples;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.UI;

public class ChatManager : MonoBehaviour
{
    public bool chatOpen = false;
    public FieldElement channel = new FieldElement(0);

    public GameManager gameManager;
    public WorldManager worldManager;

    private Transform chatScrollView;
    private TMPro.TMP_InputField chatInput;

    // Start is called before the first frame update
    async void Start()
    {
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
            SendMessage(chatInput.text);
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

    async void SendMessage(string message)
    {
        var account = gameManager.burnerManager.CurrentBurner ?? gameManager.masterAccount;
        // random salt for the message
        var randomBytes = new byte[28];
        RandomNumberGenerator.Fill(randomBytes);

        // copy to a 32 byte array
        var salt = new byte[32];
        randomBytes.CopyTo(salt, 0);

        salt = salt.Reverse().ToArray();

        var typed_data = TypedData.From(new Message
        {
            identity = account.Address,
            message = message,
            channel = channel,
            salt = new FieldElement(salt),
        });

        Debug.Log(JsonConvert.SerializeObject(typed_data));

        FieldElement messageHash = typed_data.encode(account.Address);
        Signature signature = account.Signer.Sign(messageHash);

        await worldManager.Publish(typed_data, signature);
    }
}
