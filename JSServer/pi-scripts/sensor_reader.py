import Adafruit_DHT
import requests
import json
import time

# Load config
with open("config.json", "r") as f:
    config = json.load(f)

sensor_type_map = {
    "DHT11": Adafruit_DHT.DHT11,
    "DHT22": Adafruit_DHT.DHT22
}

DHT_SENSOR = sensor_type_map.get(config["sensor_type"], Adafruit_DHT.DHT11)
DHT_PIN = config["sensor_gpio"]
SERVER_URL = config["server_url"]
INTERVAL = config["read_interval"]

def read_and_send():
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

    if humidity is not None and temperature is not None:
        data = {
            "temperature": round(temperature, 2),
            "humidity": round(humidity, 2)
        }
        try:
            response = requests.post(SERVER_URL, json=data)
            print(f"Sent: {data} | Status: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print("Failed to send data:", e)
    else:
        print("Sensor read failed.")

if __name__ == "__main__":
    while True:
        read_and_send()
        time.sleep(INTERVAL)
