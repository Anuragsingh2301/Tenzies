import React from 'react'

function Die (props){
    const styles={
        backgroundColor: props.isheld ? " #59e391":"white"

    };
    
  const dotPositions = {
    1: [[25, 25]],
    2: [[10, 10], [40, 40]],
    3: [[10, 10], [25, 25], [40, 40]],
    4: [[10, 10], [10, 40], [40, 10], [40, 40]],
    5: [[10, 10], [10, 40], [25, 25], [40, 10], [40, 40]],
    6: [[10, 8], [10, 25], [10, 42], [40, 8], [40, 25], [40, 42]]
  };

  return (
    <div className="die-face " onClick={props.toggle} style={styles}>
      <svg width="30" height="30" viewBox="0 0 50 50">  
          {dotPositions[props.num].map(([cx,cy],index)=>{
              return  <circle key={index} cx={cx} cy={cy} r="4" fill="black"/>
            })
          }

      </svg>  
    </div>
  );
}

export default Die;
