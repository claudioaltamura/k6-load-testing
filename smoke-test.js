import http from 'k6/http';
import { check } from 'k6';
import { BASEURL } from './config.js';

export const options = {
  vus: 1,
  duration: '10s',
};

export default function () {
  const res = http.get(BASEURL + '/pets?tags=cat&limit=10');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'result is empty': (r) => r.body === '[]'
  });
}