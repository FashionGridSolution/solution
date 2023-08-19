import React from 'react';



  const formatJsonBody = (jsonBody) => {
    const keyValuePairs = jsonBody.match(/'[^']+': '[^']+'/g);
    
  console.log(`Json body is ${keyValuePairs}`)
    if (!keyValuePairs) return '';
  
    const formattedBody = keyValuePairs
      .filter((_, index) => index !== 0) // Skip the first element
      .map(keyValuePair => {
        const [key, value] = keyValuePair.split(':').map(str => str.trim().replace(/'/g, ''));
        return `${key}: ${value}`;
      })
      .join('\n');
  
    return formattedBody;
  };
const JsonBodyFormatter = ({ jsonBody }) => {
  const formattedBody = formatJsonBody(jsonBody);
  console.log(`Json body formateed is ${formattedBody}`)
  return <pre>{formattedBody}</pre>;
};

export default JsonBodyFormatter;
