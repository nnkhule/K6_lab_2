# B232270018 Б. Энхбаяр 

# K6_lab_2
Программ хангамжийн чанарын баталгаа ба тест лаборторийн ажил №2


---

## Орчин

- OS: Windows
- k6 version:
```
k6.exe v2.2.0 (commit/00a9a1b7f5, go1.26.5, windows/amd64)
```
- Тестийн зорилтот сервер (Алхам 2–4): `https://test.k6.io`
- Локал сервер (Алхам 5): Express.js, `http://localhost:3000`
  

## Load Testing Results Summary (k6)

# Алхам 3

| Metric | 5 VUs | 30 VUs | 100 VUs |
| :--- | :---: | :---: | :---: |
| **Throughput (req/s)** | 7.54 req/s | 45.52 req/s | 150.60 req/s |
| **p(95) Latency** | 233.54 ms | 231.73 ms | 232.54 ms |
| **p(90) Latency** | 229.03 ms | 228.92 ms | 229.93 ms |
| **Avg Latency** | 145.34 ms | 146.74 ms | 144.82 ms |
| **Min / Max Latency** | 51.32 ms / 347.31 ms | 46.91 ms / 329.84 ms | 42.95 ms / 1.13 s |
| **Total Requests** | 462 | 2,760 | 9,226 |
| **Checks Success Rate** | 100% (231/231) | 100% (1380/1380) | 100% (4613/4613) |
| **HTTP Error Rate** | 0.00% | 0.00% | 0.00% |

# .txt file дээр байгаа тоон мэдээллийг ашигласан

**Хавсаргасан текст файл болон зураг:**
- `results/5Vus.png`, `results/run-05vu.txt`
- `results/30VUs.png`, `results/run-30vu.txt`
- `results/100Vus.png`, `results/run-100vu.txt`
- `results/stages.png`,`results/stages.txt` — stages ашигласан үр дүн

stages-тэй хувилбар (script_3.js, 5→30→100→0) нь ачааллын ерөнхий хандлагыг ажиглах зорилгоор хийгдсэн бөгөөд дээрх хүснэгтийн тоон утгуудыг тусдаа ажиллуулалтын гаралтын файлуудаас авсан.

### Гол дүгнэлт:
* **Throughput (Нэвтрүүлэх чадвар):** Хэрэглэгчийн тоо (VU) 5 -> 30 -> 100 болж **20 дахин өсөхөд** секундэд боловсруулах хүсэлтийн тоо **7.54-өөс 150.60 req/s хүртэл шугаман өссөн** байна.
* **p(95) Latency:** Хүсэлтийн 95%-ийн хариу өгөх хугацаа ачаалал нэмэгдэхэд бараг өөрчлөгдөөгүй, **~232 ms орчимд маш тогтвортой** хадгалагдсан.
* **Тогтвортой байдал:** Дээд тал нь 100 VU ачаалахад дээд хариу өгөх хугацаа (Max latency) 1.13s хүрч үл ялиг өссөн ч нийт 9,226 хүсэлтээс **алдаа (HTTP failure) 0.00%** буюу систем өндөр ачааллыг сайн дааж байна.

## Алхам 4 — Threshold (SLO)

SLO тооцоо: Baseline p95 (226ms) × 1.5 = 339ms. Энэ 1.5 коэффициентийг сонгосон шалтгаан нь энгийн ачааллын үеийн хариу хугацаанаас дунджаар 50 хувиар удаашрахыг зөвшөөрөх боловч, үүнээс дээш буюу системийн гүйцэтгэл эрс доройтох тохиолдлыг цаг тухайд нь илрүүлэх боломжтой байх явдал юм

```javascript
thresholds: {
  http_req_duration: ['p(95)<339'],
  http_req_failed:   ['rate<0.01'],
},
```
| Тест | Threshold | Бодит утга | Үр дүн |
|---|---|---|---|
| PASS (30 VU, 1m) | p(95)<339ms | 228.99ms | ✓ PASS |
| PASS | rate<0.01 | 0.00% | ✓ PASS |
| FAIL (30 VU, 1m) | p(95)<200ms | 221.18ms | ✗ FAIL |
| FAIL | rate<0.01 | 0.00% | ✓ PASS |


**Хавсаргасан файл болон зураг:**
- `results/run-threshold-pass.txt`, `result/thresholds pass.png`
- `results/run-threshold-fail.txt`, `result/threshold fail.png`, `result/thresholdsfail.png`

FAIL тестийн үед k6 `ERRO[0062] thresholds on metrics 'http_req_duration' have been crossed` гэсэн алдаа заан non-zero exit code буцаасан бөгөөд энэ нь CI/CD pipeline дээр Quality Gate ажиллаж pipeline-ийг зогсоох зарчимтай нийцэж байна.




