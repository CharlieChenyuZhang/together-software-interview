import React, { useState, useEffectf } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const InputInstruction = styled.span``
const InputWrapper = styled.div``
const InputArea = styled.input``
const OutputContainer = styled.div``

const stockApi = async (userInput, cancelToken) => {
  if (!userInput) {
    return {
      count: 0,
      result: []
    }
  }

  const URL = `https://us-central1-eng-interview.cloudfunctions.net/stock-api-proxy?q=${userInput}`
  const result = await axios.get(URL, { cancelToken: cancelToken.token })
  return result?.data;
}

let cancelToken;
const StockEngineSearchEngine = () => {

  const [stocks, setStocks] = useState([]);
  const inputAreaOnClick = async (e) => {

    //Check if there are any previous pending requests
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.")
    }


    //Save the cancel token for the current request
    cancelToken = axios.CancelToken.source()


    const userInput = e.target.value
    let stockRespons
    try {
      stockRespons = await stockApi(userInput, cancelToken);
    } catch {
      // swallow it
    }
    const stockResponsClean = stockRespons?.result?.map(each => {
      return {
        description: each.description,
        displaySymbol: each.displaySymbol
      }
    });
    setStocks(stockResponsClean)
  }


  return (
    <>
      <InputWrapper> 
        <InputInstruction>Input Query Here: </InputInstruction>
        <InputArea onChange={inputAreaOnClick}/> 
      </InputWrapper>


      <OutputContainer>
        {
          stocks?.map((each, idx) => {
            return (<div key={idx}>{each.description}</div>)
          })
        }
      </OutputContainer>
    </>
  )
}

export default StockEngineSearchEngine;
