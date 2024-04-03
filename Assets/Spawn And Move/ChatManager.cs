using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Dojo;
using Dojo.Starknet;
using Dojo.Torii;
using dojo_bindings;
using Newtonsoft.Json;
using UnityEngine;
using UnityEngine.UI;

public class ChatManager : MonoBehaviour
{
    public bool chatOpen = false;

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
            SendEmote(Emote.Happy);
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

    async void SendEmote(Emote emote)
    {
        var model = new Model("EmoteMessage", new Dictionary<string, Member>
        {
            { "identity", new Member(gameManager.masterAccount.Address, true, "contract_address") },
            { "emote", new Member(emote, false, "enum") }
        });

        var typed_data = new TypedData(model);

        FieldElement messageHash = typed_data.encode(gameManager.masterAccount.Address);
        Signature signature = gameManager.masterSigner.Sign(messageHash);

        await worldManager.Publish(typed_data, signature);
    }
}
