# Chat-KANKO

---

**//Japanese//**

## 概要

単層ニューラルネットワークによって構築されたチャットAIです。  
ユーザー入力を条件分岐によってベクトル化し、返答を3パターンの中から選びます。

### 返答パターン

- "こんにちは" → "こんにちは！元気？"  
- "元気" → "それはよかった！"  
- "さようなら" → "またね！"  

### 学習について

正確性を高めるために、3パターンの返答を順番に学習させています。  
学習後は、入力をベクトル化して最適な返答を選択します。

### 確認方法

コンソールで以下の情報を確認できます：

- ループ回数（epoch）  
- 平方誤差（finalError）

---

**//English//**

## Overview

This is a chat AI built with a single-layer neural network.
It vectorizes user input using conditional branching and selects one of three response patterns.

### Response Patterns

- "Hello" → "Hello! How are you?"
- "I'm fine" → "That's great!"
- "Goodbye" → "See you soon!"

### About Training

To improve accuracy, the AI ​​trains three response patterns in sequence.
After training, it vectorizes the input and selects the optimal response.

### How to Verify

You can view the following information in the console:

- Number of loops (epochs)
- Squared error (finalError)
