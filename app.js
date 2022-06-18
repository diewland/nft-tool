// screen var
let web3 = null;
let cur_provider = null;
let cur_contract = null;
let cur_ctr_addr = null;

// update version
$("sub.version").html(VERSION);

// log
function l(msg) { $('#div-msg').append(msg + '<br>'); }
function lx() { $('#div-msg').html(''); }

// freeze/unfreeze
function freeze(bool=true) {
  $('#sel-project').attr('disabled', bool);
  $('#ipt-token-id').attr('disabled', bool);
  $('#btn-download').attr('disabled', bool);
  if (bool) {
    lx();
    $('#btn-download').addClass('spin');
    $('#img-preview').hide();
  }
  else {
    lx();
    $('#btn-download').removeClass('spin');
    $('#img-preview').show();
  }
}
let unfreeze = () => freeze(false);

// download
$('#img-preview').on('load', unfreeze);
$('#btn-download').click(_ => {
  if (!cur_contract) return;
  let token_id = $('#ipt-token-id').val().trim();
  if (!token_id) return;
  download(token_id);
});
function download(token_id) {
  freeze();
  download_op(token_id);
}
function download_op(token_id) {
  l('1. find meta-data...');
  cur_contract.methods.tokenURI(token_id).call().then(r => {
    // https://ipfs.io/ipfs/QmZ2eKEiuV1UKxgsLrPUK9JXhvLhtbetxUwZEHRiqUaHq4/3356.json
    let json_url = 'https://ipfs.io/ipfs/' + r.split('ipfs://')[1];
    l('2. read meta-data...');
    query(json_url, info => {
      // {"image":"ipfs://QmeR1DwxMTZQPWSH2CSgNeAWHmXztsPek4SQHKtSZHg7XU","name":"Bored Town #3356","description":"Bored Town is a collection of 5555 Bored Town Monsters living on the Optimism blockchain. As an open-source brand (aka CC0), Bored Town holders have the chance to create whatever they put their mind to, both for personal and commercial purposes.","external_url":"https://quixotic.io/collection/boredtown","attributes":[{"trait_type":"Background","value":"Dark Gray"},{"trait_type":"Accessory","value":"White Mandala"},{"trait_type":"Body","value":"Sweater With Thorns"},{"trait_type":"Head","value":"Sponky"}],"compiler":"nft-inator.com"}
      // https://nftscan.mypinata.cloud/ipfs/QmeR1DwxMTZQPWSH2CSgNeAWHmXztsPek4SQHKtSZHg7XU
      let img_url = 'https://nftscan.mypinata.cloud/ipfs/' + info.image.split('ipfs://')[1];
      l('3. load image...');
      $('#img-preview').attr('src', img_url);
    })
  });
}

// JSON
function query(url, callback) {
  $.getJSON(url, data => callback(data));
  // TODO add tech exception
}

// bind project combo
function update_contract(new_provider, new_ctr_addr) {
  if (new_provider != cur_provider) {
    l("update web3 provider..");
    web3 = new Web3(new_provider);
    cur_provider = new_provider;
  }
  if (new_ctr_addr != cur_ctr_addr) {
    cur_ctr_addr = new_ctr_addr;
    let contract_url = API_OP_CONTRACT + new_ctr_addr;
    freeze();
    l("switch contract..");
    query(contract_url, function (data) {
        let contractABI = JSON.parse(data.result);
        if (contractABI != ''){
            cur_contract = new web3.eth.Contract(contractABI);
            cur_contract.options.address = new_ctr_addr;
        } else {
          alert('contractABI not found');
        }
        unfreeze();
    });
  }
}
$('#sel-project').change(evt => {
  let proj_no = $(evt.target).val();
  let info = PROJECT_INFO[proj_no];
  if (!info) return;
  let new_provider = info.provider;
  let new_ctr_addr = info.contract_addr;
  update_contract(new_provider, new_ctr_addr);
});
$('#sel-project').change();
