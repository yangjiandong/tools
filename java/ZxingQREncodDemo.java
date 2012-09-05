package demo;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import java.awt.image.BufferedImage;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import java.util.Hashtable;

import javax.imageio.ImageIO;

public class ZxingQREncodDemo {
    private static final int BLACK = 0xFF000000;
    private static final int WHITE = 0xFFFFFFFF;

    public static void main(String[] args) {

        create("看了看书每次", "c:\\aa");
        try{
        create2();
        }catch(Exception e){

        }
    }

    static void create2() throws WriterException, IOException {
        String picFormat = "png";
        StringBuilder sb = new StringBuilder(1024);
        java.io.InputStreamReader fr = new InputStreamReader(new FileInputStream(
                    "c:\\qrcode.txt"), "GBK");
        BufferedReader br = new BufferedReader(fr);
        String line = null;

        while ((line = br.readLine()) != null) {
            sb.append(line).append("\r\n");
        }

        //String str = sb.toString(); // 二维码内容
        String str = "杨晨明天要早点起来";
        System.out.println(str.length() + "|str==" + str);
        str = new String(str.getBytes("UTF8"), "ISO-8859-1");

        String path = "c:/lzb";
        Hashtable hints = new Hashtable();

        // hints.put(EncodeHintType.CHARACTER_SET, “GBK”);
        BitMatrix bitMatrix = new MultiFormatWriter().encode(str,
                BarcodeFormat.QR_CODE, 400, 400, hints);

        /**
        * begin 这段代码等同于就是 MatrixToImageWriter.writeToFile(bitMatrix, picFormat,
        * file);
        * 直接这样写就不用引用javase.jar
        */
        int width = bitMatrix.getWidth();
        int height = bitMatrix.getHeight();
        BufferedImage image = new BufferedImage(width, height,
                BufferedImage.TYPE_INT_ARGB);

        for (int x = 0; x < width; x++) {
            for (int y = 0; y < height; y++) {
                image.setRGB(x, y, bitMatrix.get(x, y) ? BLACK : WHITE);
            }
        }

        File file = new File(path + "." + picFormat);
        ImageIO.write(image, picFormat, file);
        /**
        * end 这段代码等同于就是 MatrixToImageWriter.writeToFile(bitMatrix, picFormat,
        * file);
        */
        MatrixToImageWriter.writeToFile(bitMatrix, picFormat, file);
    }

    static void create(String str, String path) {
        BitMatrix byteMatrix;

        try {
            byteMatrix = new QRCodeWriter().encode(str, BarcodeFormat.QR_CODE,
                    200, 200);

            File file = new File(path + ".png");
            MatrixToImageWriter.writeToFile(byteMatrix, "png", file);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (WriterException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
    }
}
