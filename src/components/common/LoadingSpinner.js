import React from 'react'
import { PropagateLoader } from 'react-spinners';
import { css } from '@emotion/core';

const override = css`
&&{
  position:absolute;
}
display: block;
margin: 0 auto;
border-color: red;
top:50%;
left:50%;
`;

export const LoadingSpinner = (loading) => {
    return(
        <div className='sweet-loading'>
            <PropagateLoader
            css={override}
            sizeUnit={"px"}
            size={30}
            color={'#123abc'}
            loading={loading}
            />
      </div>
    )
}