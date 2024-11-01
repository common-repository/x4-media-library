import $ from 'jquery';
import { nonces } from 'X4MediaLibrary';
import request from '~/plugin/request';


$(document).on('heartbeat-nonces-expired', () => {
  request(
    'actions/bootstrap/nonces',
    resp => {
      for (let name of Object.keys(resp.nonces)) {
        nonces[name] = resp.nonces[name];
      }
    },
  );
});
