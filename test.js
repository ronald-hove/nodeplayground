async function generateCompanyCode(companyName) {
  let companyCode = '';
  //get list of all companies registered
  const companies = await getAllCompanies();
  // filter companies by code with the first letter same as current company name
  // sort companies in DSC order
  // the first company code  will have the last sq company code number
  const filteredCompanies = companies
    .filter((company) => company.Code.substr(0, 1) == companyName.substr(0, 1))
    .sort((a, b) => {
      // sort by company code numbers in DSC order
      // extract the company code numbers only
      const last = (a.Code).split('').filter((element) => !isNaN(parseInt(element))).join('')
      const next = (b.Code).split('').filter((element) => !isNaN(parseInt(element))).join('')
      // do sort on company code numbers criteria
      return parseInt(next, 10) - parseInt(last, 10);
    })

  console.log('Filtered Companies', filteredCompanies)

  if (filteredCompanies.length === 0) {
    // no companies starting with this letter exists
    // therefore start from 0 padded by 3 as first number after first letter in company name
    companyCode = `${companyName.substr(0, 1)}${pad(0, 3)}`
  } else {
    // Previously saved companies of same first letter exist
    // Get the last known company number
    let lastKnownCompanyNumber = parseInt(
      filteredCompanies
      .shift().Code
      .split('')
      .filter((element) => !isNaN(parseInt(element)))
      .join('')
      ,10)
    // increment last known company number
    lastKnownCompanyNumber += 1;
    // Generate company Code
    companyCode = `${companyName.substr(0, 1)}${pad(lastKnownCompanyNumber, 3)}`;
  }
  return companyCode;
}


function getAllCompanies() {
  return new Promise((resolve, reject) => {
    return resolve([
      // { Code: 'ZIS000' },
      // { Code: 'Z001' },
      // { Code: 'BOS006' },
      // { Code: 'BOS001' },
      // { Code: 'BOS002' },
      // { Code: 'BOS003' },
      // { Code: 'B007' }
    ])
  })
}

function pad(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}


generateCompanyCode('Bottle').then(result => {
  console.log(result)
})
