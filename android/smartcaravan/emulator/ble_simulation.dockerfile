# Dockerfile
FROM node:18

# Bleno'nun ihtiyaç duyduğu araçlar
RUN apt-get update && apt-get install -y bluetooth bluez libbluetooth-dev libudev-dev

# Proje dosyalarını kopyala
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Bleno kodunu kopyala
COPY . .

CMD ["node", "ble_simulation.js"]
