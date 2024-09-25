import http from 'k6/http';
import { sleep } from 'k6';
import { BASEURL } from './config.js';

export const options = {
  stages: [
    {
      duration: '30s',
      target: 100
    },
    {
      duration: '10s',
      target: 0
    }
  ]
};

export default function () {
  http.get(BASEURL + '/pets?tags=cat&limit=10');
  sleep(1);
}