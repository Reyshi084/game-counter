# モンスト EX周回カウンター
## URL
https://reyshi084.github.io/game-counter/

---
## 更新情報
- **2023/10/26**
    タイトルに日本語等を使用した場合でもバックアップを作成できるようにしました。
    細かい表記などの修正をしました。
- **2023/08/21**  
    バックアップ機能を追加しました。
- **2023/06/05**  
    細かい表記などの修正をしました。
- **2023/06/01**  
    0ハマりモードを追加しました。
- **2023/04/10**  
    EX敗北数を新たにカウントするようにしました。  
    禁忌EXモードを追加しました。  
    最終周回時刻を表示するようにしました。
    細かい表記や文字サイズ等を修正しました。
- **2023/03/20**  
    複数データを保存できるようにしました。  
    データごとにタイトルを設定できるようにしました。
- **2023/03/15**  
    一部フォントを変更しました。  
    下記の説明文を一部変更しました。  
    更新時に遭遇率が計算されない不具合を修正しました。
- **2023/03/13**  
    Webページを公開しました。

---
## データの種類
#### **DATA n**  
- データのタイトルです。
- 編集ボタンから変更可能です。
- 横に最終周回時刻が表示されます。
- nは上部のセーブデータ選択欄と紐づいている番号です。
#### **ハマり**  
- 前回遭遇時からの周回数です。
#### **ラック**  
- EXキャラクターの合計ラック数です。
#### **遭遇数**  
- 周回開始時からのEX遭遇数です。
#### **遭遇率**  
- 総周回数と遭遇数から自動で計算されます。
#### **最小/最大ハマり**  
- 周回開始時からのハマり数の最小/最大です。
- 周回ボタンや遭遇ボタンを押すと自動で更新されます。
#### **総周回数**  
- 周回開始時からの周回数です。  
#### **EX敗北数**
- EXステージで敗北した数です。  
- 遭遇時にラック「0」と指定すると自動でカウントされます。
#### **至宝発動数(禁忌EXモード限定)**
- EX時に至宝が発動した数です。
- 遭遇時にラック「2」と指定すると自動でカウントされます。
#### **至宝発動率(禁忌EXモード限定)**
- EX時に至宝が発動した確率です。
- 至宝発動数などの情報から自動で計算されます。
#### **ラキリザ数(禁忌EXモード限定)**
- EX時にラキリザが発動した数です。
- 遭遇時にラック3以上を指定すると自動でカウントされます。
#### **ラキリザ率(禁忌EXモード限定)**
- EX時にラキリザが発動した確率です。
- ラキリザ数などの情報から自動で計算されます。
---
## 使用方法
#### **周回ボタン**  
- 押すことで、カウンターを増やすことが出来ます。
- １周が終ったらこのボタンを１回押してください。
- 0ハマりモード時にEXが出現した際はこのボタンを押さず、EX終了時に遭遇ボタンを押すようにしてください。
#### **遭遇ボタン**  
- 押すことで、ドロップ数入力画面に移ります。
- EX戦が終了した後に押すことをお勧めします。
#### **編集ボタン**  
- 押すことで、それぞれの情報を入力することが出来ます。
- データに矛盾がある場合は、ハマり数を基準に修正されます。
- 入力後は完了ボタンを押してください。
#### **リセットボタン**  
- 押すことで、リセットの確認画面に移ります。
- 確認画面でOKを押すと、全てのデータがリセットされます。
#### **上部の数字のボタン**
- セーブデータ選択欄です。
- 押すことで、セーブデータの切り替えを行うことが出来ます。
- 最大で5つのデータが使用可能です。
#### **0ハマりモードのチェックボックス**
- EXに連続で遭遇する時を「0ハマり」としてカウントできるようにします。
- このモードでは、遭遇ボタンを押した時に総周回数がカウントされるようになります。
- EXステージ出現時には**周回ボタンを押さず**、クエスト終了時に遭遇ボタンを押すようにしてください。
#### **禁忌EXモードのチェックボックス**
- 至宝・ラキリザに関する情報の計算および表示/非表示を行うことが出来ます。
- また、編集時にこれまでの至宝発動数を自動で計算するボタンが表示されます。（詳細な情報を入力していただくと、正確な至宝発動数が自動で入ります。）
#### **バックアップの作成/復元**
- （端末間のデータのやりとりや、データの消滅がご不安な方のための機能となります。）
- [作成ボタン]では、現在表示されているデータのバックアップデータを作成し、クリップボードにコピーします。
- [復元ボタン]では、現在表示されているデータをバックアップデータで上書きします。
- 作成されたデータは利用者自身で大切に管理してください。

---
## Twitterリンク
https://twitter.com/reygame014  
質問や不具合報告、要望などがあればこちらへどうぞ。
