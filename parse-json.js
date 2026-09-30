import http from 'k6/http';
import { check } from 'k6';
import { BASEURL } from './config.js';

export default function () {
  const res = http.get(BASEURL + '/pets?tags=cat&limit=10');
  console.log(res.json())
  check(res, {
    'status is 200': (r) => r.status === 200,
    'result is empty': (r) => r.body === '[]'
  });
}