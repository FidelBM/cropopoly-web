/*
Autor:            Mariana Balderrábano
Modificado por:   Estefanía Rico 
                  Fidel Bonilla

El código es para definir la sección de ranking y estados desde donde de los usuarios
*/

//Importa React, useEffect y useRef
import React, { useEffect, useRef } from 'react';

//Importa el componente PieChart
import PieChart from "./pieChart";
import Ranking from "../../page/pruebas"

//Divide al componente en dos para insertar gráficas de ranking y estados
export const RanStatesComponent = () => {
    //Define las referencias para ajustar altura de componentes
    const leftRef = useRef(null); 
    const rightRef = useRef(null);

    useEffect(() => {
        if (leftRef.current && rightRef.current) {
            const leftHeight = leftRef.current.clientHeight;
            const rightHeight = rightRef.current.clientHeight;
            const maxHeight = Math.max(leftHeight, rightHeight);
        
            leftRef.current.style.height = `${maxHeight}px`;
            rightRef.current.style.height = `${maxHeight}px`;
        }
    }, []);

  //Inserta las gráficas de ranking y estados
  return (
    <React.Fragment>
        <div >
            <section>
                <div className="App-Separated-Container flex flex-col md:flex-row">
                    <div className='App-half-dark w-full md:w-1/2' ref={leftRef}> 
                        Ranking
                        < Ranking/>
                    </div>

                    <div className='App-half-ran w-full md:w-1/2' ref={rightRef} >
                        Estados
                        <PieChart />
                    </div>
                </div>
            </section>
        </div>
    </React.Fragment>
  )
}
