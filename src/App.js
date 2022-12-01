import "./App.css";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useMemo, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { firebaseApp } from "./enviroments";
import { getDatabase, onValue, ref, set } from "firebase/database";
import sadFace from "./assets/sad-face.png";
function App() {
  const [parkingPlace, setParkingPlace] = useState("");
  const [metodo, setMetood] = useState("Entrada");
  const [fullParkin, setFullParkin] = useState(false);
  const [scanned, setScanned] = useState(false);
  const realTime = getDatabase(firebaseApp);

  const getRealTime = () => {
    const parkinsRef = ref(realTime, "parkins/");
    onValue(parkinsRef, (snapshot) => {
      const data = snapshot.val();
      validateParkins(data);
    });
  };

  const validateParkins = (data) => {
    const { LoteA, LoteB } = data;

    if (LoteA.one.status === "disponible") {
      if (LoteA.one.scanned === true) {
        setScanned(true);
        setTimeout(() => {
          setScanned(false);
          const parkinsRef = ref(realTime, "parkins/LoteA/one");
          onValue(parkinsRef, (snapshot) => {
            const parkinData = snapshot.val();
            set(ref(realTime, "parkins/LoteA/one"), {
              ...parkinData,
              scanned: false,
              timeArrive: new Date().toLocaleTimeString(),
              status: "ocupado",
              ownerUid: "4XaKHvhxGGEUTVPCqPec",
            });
          });
        }, [4000]);
      } else {
        setParkingPlace("parkins/LoteA/one");
      }
    } else if (LoteB.one.status === "disponible") {
      setParkingPlace("parkins/LoteB/one");
    } else {
      setFullParkin(true);
    }
  };

  useMemo(() => {
    getRealTime();
  }, [realTime]);

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="item"
          onClick={() => {
            setMetood("Entrada");
            setParkingPlace("mOt76OFrPreG3WAtwUEa");
          }}
        >
          Entrada
        </div>
        <div className="item" onClick={() => setMetood("Salida")}>
          Salida
        </div>
      </header>
      {scanned ? (
        <div
          style={{
            display: "grid",
            placeItems: "center",
            fontSize: 50,
          }}
        >
          <h1> Puede ingresar :)</h1>{" "}
        </div>
      ) : (
        <div>
          {fullParkin ? (
            <div style={{ display: "grid", placeItems: "center" }}>
              <h1>Por el momento no hay espacios disponibles</h1>
              <img width={200} alt="" src={sadFace}></img>
            </div>
          ) : (
            <div className="qr-container">
              {(metodo === "Entrada") & (fullParkin === false) ? (
                <>
                  <h2>Escanea el siguiente codigo para Ingresar</h2>
                </>
              ) : (
                <h2>Escanea el siguiente codigo para Salir</h2>
              )}
              <QRCodeCanvas
                id="qrCode"
                value={parkingPlace}
                size={400}
                bgColor={"white"}
                level={"H"}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
