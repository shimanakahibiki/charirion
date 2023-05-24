// GP-20U7
// 公式っぽいライブラリはハードウェアシリアルをオーバーライドしてたので、SoftwareSerialでも使えるようにした
//
// References:
// https://cdn.sparkfun.com/datasheets/GPS/GP-20U7.pdf
// https://www.arduino.cc/en/Reference/SoftwareSerial
// http://forum.arduino.cc/index.php?topic=288234.0
//
//#include <SoftwareSerial.h>

#define NUM_POS  8
#define NUM_VAL 15
#define BAUD_RATE 9600

char gpsVals[NUM_POS][NUM_VAL];
int gpsPosIndex = 0;
int gpsValIndex = 0;

boolean isLatLon = false;

HardwareSerial gps(PD_6, PD_5); // RX, TX

void setup() {
  Serial.begin(BAUD_RATE);
  gps.begin(BAUD_RATE);
}

void loop() {
  while (gps.available() > 0) {

    int serialData = gps.read();
    //Serial.print(serialData);
    //continue;

    // begin
    if(serialData == '$') {
      for(int i=0;i<NUM_POS;i++) {
        for(int j=0;j<NUM_VAL;j++) {
          gpsVals[i][j] = '\0';
        }
      }
      gpsPosIndex = 0;
      gpsValIndex = 0;
    }
    else if(serialData == ',') {
      // Message IDがvalidか
      if (gpsPosIndex == 0) {
        int correctCount = 0;
        int checkPattern[5] = { 'G', 'P', 'G', 'L', 'L' };
        for(int i=0;i<5;i++) {
          if (checkPattern[i] == gpsVals[0][i]) {
            correctCount++;
          }
        }

        if (correctCount == 5) {
          isLatLon = true;
        }
        else {
          isLatLon = false;
        }
      }
      
      if (isLatLon == true && gpsPosIndex < NUM_POS) {
        gpsPosIndex++;
        gpsValIndex = 0;
      }
    }
    else if(serialData == '\r') {
    }
    else if(serialData == '\n') {
      if (isLatLon == true) {
        // strodについて : http://www9.plala.or.jp/sgwr-t/lib/strtod.html
        char*endptr;
        
        // 緯度・経度のみ取る
        // [Message ID][Latitude][N/S Indicator][Longitude][E/W Indicator][UTC Position][Status][Checksum][<CR>][<LF>]
        // $GPGLL,          X, X,           X, X,  149558.00, V, N*47  ... 起動時
        // $GPGLL, 3315.72140, N, 13922.00799, E,  123736.00, A, A*6A  ... 安定してくると出てくる
        // $GPGLL, 3713.22756, N, 12058.04162, W, 161329.487, A, *2C   ... 理想
        float latitude  = strtod(gpsVals[1], &endptr);
        float longitude = strtod(gpsVals[3], &endptr);

        Serial.print("[recv]");
        Serial.print(latitude);
        Serial.print(", ");
        Serial.print(longitude);
        Serial.println();
        
        for(int i=0;i<NUM_POS;i++) {
          Serial.print("[");
          Serial.print(i);
          Serial.print("]");
          for(int j=0;j<NUM_VAL;j++) {
            if (gpsVals[i][j] != '\0') {
              Serial.print((char)gpsVals[i][j]);
            }
            gpsVals[i][j] = '\0';
          }
          Serial.print(" ");
        }
        Serial.println();
      }
    }
    else {
      if ((isLatLon == true || gpsPosIndex == 0) && gpsValIndex < NUM_VAL) {
        gpsVals[gpsPosIndex][gpsValIndex++] = serialData;
      }
    }

    delay(1000);
  }

//  int serialData2 = gps.read();
//  Serial.print("connection error: ");
//  Serial.println(serialData2);
}
