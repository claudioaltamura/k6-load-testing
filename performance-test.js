import http from 'k6/http';
import { check } from 'k6';
import { Trend } from 'k6/metrics';
import { BASEURL } from './config.js';

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    list_cats_limit_10: ['p(95)<100', 'max<200'],
    'http_req_duration{page:petlist}': ['p(95)<100'],
    checks: ['rate<0.02'],
    'checks{page:petlist}': ['rate<0.01']
  }
};

let list_cats_limit_10 = new Trend('list_cats_limit_10')

export default function () {
  const res = http.get(BASEURL + '/pets?tags=cat&limit=10', 
    { tags: 
      { page: 'petlist'}
    } 
  );
  list_cats_limit_10.add(res.timings.duration)
  check(res, {
    'status is 200': (r) => r.status === 200,
    'result is empty': (r) => r.body === '[]'
    }, {
      page: 'petlist'
    }
  );
}