// screen var
let cur_contract = null;

// UX
function freeze(bool=true) {
  $('#sel-project').attr('disabled', bool);
  $('#ipt-token-id').attr('disabled', bool);
  $('#btn-download').attr('disabled', bool);
  if (bool) {
    $('#img-preview').hide();
  }
  else {
    $('#img-preview').show();
  }
}
let unfreeze = () => freeze(false);
freeze();

// bind download button
$('#btn-download').click(_ => {
  let token_id = $('#ipt-token-id').val().trim();
  if (!cur_contract) return;
  if (!token_id) return;
  download(token_id);
});

// download
function download(token_id) {
  freeze();
  cur_contract.methods.tokenURI(token_id).call().then(r => {
    // https://ipfs.io/ipfs/QmZ2eKEiuV1UKxgsLrPUK9JXhvLhtbetxUwZEHRiqUaHq4/3356.json
    let json_url = 'https://ipfs.io/ipfs/' + r.split('ipfs://')[1];
    console.log('resolve json :', json_url);
    // https://nftscan.mypinata.cloud/ipfs/QmeR1DwxMTZQPWSH2CSgNeAWHmXztsPek4SQHKtSZHg7XU
    $.getJSON(json_url, info => {
      // {"image":"ipfs://QmeR1DwxMTZQPWSH2CSgNeAWHmXztsPek4SQHKtSZHg7XU","name":"Bored Town #3356","description":"Bored Town is a collection of 5555 Bored Town Monsters living on the Optimism blockchain. As an open-source brand (aka CC0), Bored Town holders have the chance to create whatever they put their mind to, both for personal and commercial purposes.","external_url":"https://quixotic.io/collection/boredtown","attributes":[{"trait_type":"Background","value":"Dark Gray"},{"trait_type":"Accessory","value":"White Mandala"},{"trait_type":"Body","value":"Sweater With Thorns"},{"trait_type":"Head","value":"Sponky"}],"compiler":"nft-inator.com"}
      let img_url = 'https://nftscan.mypinata.cloud/ipfs/' + info.image.split('ipfs://')[1];
      console.log('resolve photo :', img_url);
      $('#img-preview').attr('src', img_url);
    })
  });
}
$('#img-preview').on('load', unfreeze);

// init web3
let web3 = new Web3(PROVIDER_ALCHEMY);

// get current contract
let contract_addr = PROJECT_INFO[1].contract_addr;
let contract_url = API_OP_CONTRACT + contract_addr;
$.getJSON(contract_url, function (data) {
    let contractABI = JSON.parse(data.result);
    if (contractABI != ''){
        cur_contract = new web3.eth.Contract(contractABI);
        cur_contract.options.address = contract_addr;
        unfreeze();
    } else {
      alert('Sorry, Please try again later.'); // TODO update text
    }
});
