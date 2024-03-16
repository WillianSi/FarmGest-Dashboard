import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/img/animation/loading.json';

const ComponenteAnimado = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',width:'60px', height:'20px' }}>
      <Lottie animationData={animationData}/>
    </div>
  );
};

export default ComponenteAnimado;