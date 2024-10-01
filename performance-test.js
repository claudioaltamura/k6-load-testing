import http from 'k6/http';
import { check } from 'k6';
import { BASEURL } from './config.js';

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<100'],
    http_req_duration: ['max<2000'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  const res = http.get(BASEURL + '/pets?tags=cat&limit=10');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'result is empty': (r) => r.body === '[]'
  });
}