import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    'http_req_duration{endpoint:fast}': ['p(95)<50'],
    'http_req_duration{endpoint:slow}': ['p(95)<150'],
  },
};

export default function () {
  const fast = http.get('http://localhost:3000/', {
    tags: { endpoint: 'fast' },
  });
  check(fast, { 'fast status 200': (r) => r.status === 200 });

  const slow = http.get('http://localhost:3000/slow', {
    tags: { endpoint: 'slow' },
  });
  check(slow, { 'slow status 200': (r) => r.status === 200 });

  sleep(1);
}