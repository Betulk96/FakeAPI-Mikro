# 🧩 Mikro-Frontend Docker Compose Setup

Bu proje, **mikro-frontend yapısını** Docker Compose kullanarak kolayca ayağa kaldırmak için hazırlanmıştır.  
Her mikro-frontend kendi container'ında çalışır ve NGINX reverse proxy sayesinde tek bir URL üzerinden erişilebilir.

---

## 📦 Proje Yapısı

```
project-root/
 ├─ home/              # 1. mikro-frontend (Next.js)
 │   └─ Dockerfile
 ├─ cart/              # 2. mikro-frontend (Next.js)
 │   └─ Dockerfile
 ├─ nginx/
 │   └─ nginx.conf     # reverse proxy config
 └─ docker-compose.yml
```

---

## 🚀 Kurulum ve Çalıştırma

1. Projeyi klonla:
   ```bash
   git clone <repo-url>
   cd project-root
   ```

2. Docker Compose ile çalıştır:
   ```bash
   docker-compose up --build
   ```

3. Uygulamaya erişim:
   - [http://localhost:8080/](http://localhost:8080/) → **Home frontend**
   - [http://localhost:8080/cart](http://localhost:8080/cart) → **Cart frontend**

---

## ⚙️ Servisler

- **home_service** → Next.js tabanlı `home` uygulaması  
- **cart_service** → Next.js tabanlı `cart` uygulaması  
- **nginx_gateway** → Reverse proxy, tüm istekleri ilgili mikro-frontendlere yönlendirir  

---

## 🐳 Faydalı Komutlar

- Container’ları arka planda çalıştır:
  ```bash
  docker-compose up -d --build
  ```

- Logları izle:
  ```bash
  docker-compose logs -f
  ```

- Servisleri durdur:
  ```bash
  docker-compose down
  ```

---

## 🌐 Paylaşım

Projeyi başkalarıyla paylaşmak için bu repo’yu gönderin.  
Kendi bilgisayarlarında sadece:

```bash
git clone <repo-url>
cd project-root
docker-compose up --build
```

komutlarıyla **tek bir giriş noktası üzerinden tüm mikro-frontendlere erişebilirler.**
