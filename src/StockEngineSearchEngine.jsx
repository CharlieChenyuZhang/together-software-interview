import React, { useState, useEffectf } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const InputInstruction = styled.span``
const InputWrapper = styled.div``
const InputArea = styled.input``
const OutputContainer = styled.div``

const stockApi = async (userInput) => {
  if (!userInput) {
    return {
      count: 0,
      result: []
    }
  }

  const URL = `https://us-central1-eng-interview.cloudfunctions.net/stock-api-proxy?q=${userInput}`
  const result = await axios.get(URL);
  return result?.data;
}
  
const StockEngineSearchEngine = () => {

  const [stocks, setStocks] = useState([]);
  const inputAreaOnClick = async (e) => {
    const userInput = e.target.value
    const stockRespons = await stockApi(userInput);
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
          stocks.map((each, idx) => {
            return (<div key={idx}>{each.description}</div>)
          })
        }
      </OutputContainer>
    </>
  )
}

export default StockEngineSearchEngine;
