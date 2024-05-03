import React, { useEffect, useRef } from 'react';
import mexico from '../Images/mexico.png';
import ran from '../Images/ran.png';
import PieChart from "./pieChart";
import Ranking from "../../page/pruebas"


export const RanStatesComponent = () => {
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
