import "./App.css";
import Table from "./components/Table";
import PaternList from "./components/PaternList";
import { useState } from "react";

function App() {
  const [props, setProps] = useState([[]]);
  const passing = (patern) => {
    setProps(patern);
  };
  return (
    <>
      <div style={{ borderBottom: "4px solid black", marginBottom: "20px" }}>
        <h1 style={{ textAlign: "center" }}>ライフゲーム</h1>
      </div>
      <div style={{ margin: "0 auto", width: "850px" }}>
        <Table props={props} />
        <div style={{ marginTop: "30px" }}>
          <h3>ライフゲームとは...</h3>
          <p>
            ライフゲームとは4つのルールから生命の誕生や進化、淘汰をシミュレーションできるゲーム
          </p>
          <h4>主なルール</h4>
          <p>
            各セルには「生」と「死」の2つの状態があり、あるセルの次のステップ（世代）の状態は周囲の8つのセルの今の世代における状態により決定される。
          </p>
          <ol>
            <li>
              誕生:
              死んでいるセルに隣接する生きたセルがちょうど3つあれば、次の世代が誕生する。
            </li>
            <li>
              生存:
              生きているセルに隣接する生きたセルが2つか3つならば、次の世代でも生存する。
            </li>
            <li>
              過疎:
              生きているセルに隣接する生きたセルが1つ以下ならば、過疎により死滅する。
            </li>
            <li>
              過密:
              生きているセルに隣接する生きたセルが4つ以上ならば、過密により死滅する。
            </li>
            <a href="https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0">
              Wikipediaより引用
            </a>
          </ol>
          <PaternList passing={passing} />
          <p>
            <span style={{ fontWeight: "bold" }}>補足</span>:
            Generateボタンを押すことでランダムにAliveセルを生成することもできますが、ペンアイコンやバックスペースアイコンを押すことでセルに直接書いたり消したりもできます。たまにクリックを押していない状態でも反応してしまうことがありますが、もう一度押すことで元に戻せます。
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
