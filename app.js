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
let qs_project = get_qs('project');
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
  download(token_id);
});
function download(token_id) {
  freeze();
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
      // let img_url = 'https://nftscan.mypinata.cloud/ipfs/' + info.image.split('ipfs://')[1];
      // https://quixotic.infura-ipfs.io/ipfs/QmbKa8WixDNeZCsxjeAchgzC8UqiAq9YYrtHx8cgxLzRe6
      let img_url = 'https://quixotic.infura-ipfs.io/ipfs/' + info.image.split('ipfs://')[1];
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
