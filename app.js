// screen var
let web3 = null;
let cur_provider = null;
let cur_contract = null;
let cur_ctr_addr = null;

// query string
function get_qs(k) {
  var half = location.search.split(k + '=')[1];
  return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
}
let qs_project = get_qs('project') || get_qs('p');
let qs_token_id = get_qs('id');

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
  download(+token_id);
});
function download(token_id) {
  freeze();
  let proj_no = $('#sel-project').val();
  if (proj_no == PROJ_APETIMISM)
    download_apeti_bg(token_id);
  else if (proj_no == PROJ_APETI_NOBG)
    download_apeti_nobg(token_id);
  else
    download_op(token_id);
}
function download_op(token_id) {
  l('1. finding meta-data...');
  cur_contract.methods.tokenURI(token_id).call().then(r => {
    // https://ipfs.io/ipfs/QmZ2eKEiuV1UKxgsLrPUK9JXhvLhtbetxUwZEHRiqUaHq4/3356.json
    let json_url = 'https://ipfs.io/ipfs/' + r.split('ipfs://')[1];
    let refresh_url = './index.html?project=' + $('#sel-project').val().trim() + '&id=' + token_id;
    l(`2. reading meta-data... <a href='${refresh_url}'>refresh</a>`);
    console.log(json_url);
    query(json_url, info => {
      // {"image":"ipfs://QmeR1DwxMTZQPWSH2CSgNeAWHmXztsPek4SQHKtSZHg7XU","name":"Bored Town #3356","description":"Bored Town is a collection of 5555 Bored Town Monsters living on the Optimism blockchain. As an open-source brand (aka CC0), Bored Town holders have the chance to create whatever they put their mind to, both for personal and commercial purposes.","external_url":"https://quixotic.io/collection/boredtown","attributes":[{"trait_type":"Background","value":"Dark Gray"},{"trait_type":"Accessory","value":"White Mandala"},{"trait_type":"Body","value":"Sweater With Thorns"},{"trait_type":"Head","value":"Sponky"}],"compiler":"nft-inator.com"}
      // https://nftscan.mypinata.cloud/ipfs/QmeR1DwxMTZQPWSH2CSgNeAWHmXztsPek4SQHKtSZHg7XU
      // https://quixotic.infura-ipfs.io/ipfs/QmbKa8WixDNeZCsxjeAchgzC8UqiAq9YYrtHx8cgxLzRe6
      let img_code = info.image.split('ipfs://')[1];
      let img_url = 'https://quixotic.infura-ipfs.io/ipfs/' + img_code;
      l(`3. loading image... or <a href='${img_url}'>open directly</a>`);
      console.log(info);
      console.log(img_url);
      $('#img-preview').attr('src', img_url);
    })
  }).catch(msg => {
    alert(msg);
    unfreeze();
  });
}
function download_apeti_bg(token_id) {
  let patt = 'https://cdn.apetimism.com/nfts/<MINT_KEY>.jpg?v=2';
  download_apeti(token_id, patt);
}
function download_apeti_nobg(token_id) {
  let patt = 'https://cdn.apetimism.com/nftstransparent/<MINT_KEY>.png?v=2';
  download_apeti(token_id, patt);
}
function download_apeti(token_id, url_patt) {
  if ((token_id >= 0) && (token_id < 3999)) { // 0-3998
    // https://cdn.apetimism.com/nfts/hidden.jpg
    // https://cdn.apetimism.com/nfts/60143956.jpg?v=2
    // https://cdn.apetimism.com/nftstransparent/69470870.png?v=2
    let mint_key = APETI_MINT_KEYS[token_id];
    let img_url = 'https://cdn.apetimism.com/nfts/hidden.jpg';
    if (mint_key != 'hidden') {
      img_url = url_patt.replace('<MINT_KEY>', mint_key);
    }
    l(`loading image... or <a href='${img_url}'>open directly</a>`);
    console.log(img_url);
    $('#img-preview').attr('src', img_url);
  }
  else {
    alert('Token ID between 0-3998');
    unfreeze();
  }
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
    let url = API_OP_CONTRACT + new_ctr_addr;
    freeze();
    l("switch contract..");
    query(url, data => {
        unfreeze();
        let contractABI = JSON.parse(data.result);
        if (contractABI) {
          cur_contract = new web3.eth.Contract(contractABI);
          cur_contract.options.address = new_ctr_addr;
          console.log('contract', cur_contract);
          if (qs_token_id) {
            $('#ipt-token-id').val(qs_token_id);
            $('#btn-download').click();
            qs_token_id = null;
          }
        }
        else {
          alert('contractABI not found');
        }
    });
    cur_ctr_addr = new_ctr_addr;
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
if (qs_project) $('#sel-project').val(qs_project);
$('#sel-project').change();
