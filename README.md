# To-Do List dApp — Algorand (Simple Stateful Contract)

**One-line:** A minimal Algorand stateful smart contract that stores a to-do entry (title + description) in global state and exposes an `Addtodo` method to add items.

---

## Table of contents

* [Project Description](#project-description)
* [What it does](#what-it-does)
* [Features](#features)
* [Deployed Smart Contract Link](#deployed-smart-contract-link)
* [Contract interface & quick explanation](#contract-interface--quick-explanation)
* [How to call the contract (example)](#how-to-call-the-contract-example)
* [Limitations & suggested improvements](#limitations--suggested-improvements)
* [Development / Local testing (quick start)](#development--local-testing-quick-start)
* [Contributing](#contributing)
* [License](#license)

---

## Project Description

This project demonstrates a beginner-friendly **stateful Algorand smart contract** (written using the `@algorandfoundation/algorand-typescript` style) that provides a single `Addtodo` method to save a to-do entry into **global state**. The contract is intentionally minimal so you can learn the basics of:

* defining global state,
* writing a contract method,
* storing and reading string data onchain,
* calling the contract from a frontend or script.

---

## What It Does

* Exposes a single method `Addtodo(title: string, description: string)` which concatenates the provided `title` and `description` and stores the result in global state under the key `todolist`.
* Returns the `title` string from the method.
* Global state holds the latest stored to-do entry as a single string value.

Typical workflow:

1. User (or frontend) creates an application call transaction that calls `Addtodo` with two string arguments (`title`, `description`).
2. The contract concatenates the arguments and updates the global key `todolist`.
3. The dApp can then read the `todolist` global state to show the latest entry.

---

## Features

* Minimal, easy-to-follow stateful Algorand smart contract.
* Stores a to-do entry (title + description) in contract global state.
* Single method interface suitable for learning, demonstration, and extension.
* Designed to be simple and beginner friendly.

---

## Deployed Smart Contract Link
<img width="1912" height="957" alt="image" src="https://github.com/user-attachments/assets/b5c87a51-e745-4730-b85f-9decc1370141" />

**Smart Contract on Algorand TestNet:**
[https://lora.algokit.io/testnet/application/745361495](https://lora.algokit.io/testnet/application/745361495)

(Contract Application ID: `745361495`)

---

## Contract interface & quick explanation

Here is the provided contract code (short):

```ts
import { Contract, GlobalState } from '@algorandfoundation/algorand-typescript'

export class Todo extends Contract {
  todolist = GlobalState<string>({
    key: "todolist",
    initialValue: " "
  })

  Addtodo(title: string, description: string): string {
    this.todolist.value = title + "" + description;
    return title;
  }
}
```

**Notes:**

* `todolist` is a single global state variable (string).
* `Addtodo` writes the concatenation of `title` and `description` into `todolist` and returns the `title`.
* `initialValue` is a blank string.

---

## How to call the contract (example)

Below is a simple, **conceptual** example showing how a frontend or script would call the contract with `algosdk`. Adjust to your tooling (AlgoSigner, WalletConnect, AlgoKit bindings, or generated TypeScript client).

```js
// PSEUDO-CODE using algosdk (conceptual)
const encoder = new TextEncoder()
const appId = 745361495
const sender = YOUR_ADDRESS
const params = await algodClient.getTransactionParams().do()

const addTodoTxn = algosdk.makeApplicationNoOpTxn(
  sender,
  params,
  appId,
  [
    encoder.encode("Addtodo"),         // optional method-name arg (ABI-less pattern)
    encoder.encode("Buy groceries"),   // title
    encoder.encode("Milk, eggs, bread")// description
  ]
)

// sign and send with your wallet / signer...
```

If you use a contract binding generator (the `@algorandfoundation/algorand-typescript` contract tooling), the generated client will likely expose a typed `addTodo(title, description)` function — prefer that for safety and convenience.

---

## Limitations & suggested improvements

**Current limitations**

* Only **one** to-do entry is stored (global `todolist` string). New calls overwrite the previous entry.
* The concatenation `title + "" + description` currently has no delimiter — titles and descriptions may run together.
* Not optimized for multiple users or multiple tasks.

**Suggested improvements**

* Store tasks in **local state per user** (each account keeps its tasks).
* Use a JSON-encoded string or a delimiter when concatenating (e.g. `title + "||" + description`) so you can parse title/description back.
* Implement an append pattern (e.g., store tasks as a JSON array in global state or use multiple keys / boxed bytes) to support many tasks.
* Add methods for `Update`, `Delete`, and `List`.
* Add authentication/permission rules (only the creator can delete, etc.).
* Use compact encodings or off-chain storage (IPFS) plus on-chain pointers for large data.
* Return meaningful results and events (if using an app indexer / event pattern).

**Quick code tweak suggestion**

```ts
this.todolist.value = title + " | " + description;
```

(or JSON)

```ts
this.todolist.value = JSON.stringify({ title, description, ts: Date.now() })
```

---

## Development / Local testing (quick start)

Below are recommended steps to run and test locally. Adapt to your setup (AlgoKit, algorand-builder, or plain `algod` + `algosdk`).

1. Install Node.js (LTS) and your preferred Algorand tooling (AlgoKit, algosdk, or algorand-builder).
2. Clone this repo.
3. Install dependencies:

```bash
npm install
```

4. Compile/deploy the contract using your chosen tool (AlgoKit / algonet / algob). If using AlgoKit you can point it at TestNet and deploy; the deployed app id is `745361495`.
5. From frontend or script, invoke `Addtodo` as shown above.

If you want exact commands for your toolchain (AlgoKit, algob, algosdk + PyTeal/Goal) tell me which tool you used to build/deploy and I can add concrete instructions.

---

## Contributing

Contributions are welcome! Ideas:

* Add multiple-task support.
* Add frontend UI (React + WalletConnect/AlgoSigner).
* Add tests and CI deployment scripts.
* Improve method signatures and state layout.

Please open issues and PRs with clear descriptions and tests where possible.

