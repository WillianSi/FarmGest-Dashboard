import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/img/animation/table.json';

const ComponenteAnimado = () => {
  return (
    <div style={{ width:'150px', height:'150px' }}>
      <Lottie animationData={animationData}/>
    </div>
  );
};

export default ComponenteAnimado;