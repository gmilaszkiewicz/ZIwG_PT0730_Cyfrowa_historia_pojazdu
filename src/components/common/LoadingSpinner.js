import React from 'react'
import { PropagateLoader } from 'react-spinners';
import { css } from '@emotion/core';

const styles = css`
  &&{
    position:absolute;
  }
  display: block;
  margin: 0 auto;
  border-color: 'red';
  color: 'red';
  top: 50%;
  left:50%;
`;

export const LoadingSpinner = (loading) => {
    return(
        <div className='sweet-loading'>
            <PropagateLoader
            css={styles}
            sizeUnit={"px"}
            size={30}
            color={'red'}
            loading={loading}
            />
      </div>
    )
}