using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Dojo;
using Dojo.Torii;
using dojo_bindings;
using JetBrains.Annotations;
using UnityEngine;
using Debug = UnityEngine.Debug;

// public class Player : EntityInstance {
//     public Position position => new Position(models["Position"]);
//     public Moves moves => new Moves(models["Moves"]);

//     public static string[] _models = {"Position", "Moves"};

//     void Start() {
//         Debug.Log("Player.Start");
//         Debug.Log($"position: {position.x}, {position.y}");
//         Debug.Log($"moves: {moves.lastDirection}");
//     }

//     void Update() {
//     }

//     public override void OnEntityStateUpdate(dojo.FieldElement key, Model[] models) {
//         base.OnEntityStateUpdate(key, models);
//         Debug.Log("Player.OnEntityStateUpdate");
//         // Debug.Log($"key: {key}");
//         // Debug.Log($"position: {position.x}, {position.y}");
//     }
// }