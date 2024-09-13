import { Audio } from "expo-av";
import { numberSounds } from "../utils/AudioMappings";

export async function playNumberSound(number, slowAudio, sound) {
  try {
    if (sound) {
      await sound.unloadAsync();
    }

    const playAudioFile = async (fileNumber) => {
      if (!numberSounds[fileNumber]) {
        throw new Error(`Sound file not found for number: ${fileNumber}`);
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        numberSounds[fileNumber]
      );
      await newSound.setRateAsync(slowAudio ? 0.3 : 1, true);
      await newSound.playAsync();

      await new Promise((resolve) =>
        setTimeout(resolve, slowAudio ? 4000 : 1500)
      );
      await newSound.unloadAsync();
    };

    while (number > 0) {
      if (number > 99999) {
        const num = Math.floor(number / 100000);
        console.log(num, "a");
        if (num < 20) {
          await playAudioFile(num);
        } else {
          const tensDigit = Math.floor(num / 10) * 10;
          const onesDigit = num % 10;
          if (tensDigit !== 0) {
            await playAudioFile(tensDigit);
          }
          if (onesDigit !== 0) {
            await playAudioFile(onesDigit);
          }
        }
        await playAudioFile(100000);
        number = number % 100000;
        // break;
      }
      if (number > 999) {
        const num = Math.floor(number / 1000);
        if (num < 20 && num > 0) {
          await playAudioFile(num);
          await playAudioFile(1000);
          number = number % 1000;
        } else {
          const tensDigit = Math.floor(num / 10) * 10;
          const onesDigit = num % 10;
          if (tensDigit !== 0) {
            await playAudioFile(tensDigit);
          }
          if (onesDigit !== 0) {
            await playAudioFile(onesDigit);
          }
          await playAudioFile(1000);
          number = number % 1000;
        }
        // break;
      }
      if (number < 1000 && number % 100 == 0) {
        const num = number / 100;
        if (num !== 0) {
          await playAudioFile(num);
          await playAudioFile(100);
        }
        break;
      } else if (number > 100) {
        const num = Math.floor(number / 100);
        await playAudioFile(num);
        number = number % 100;
      }
      if (number < 100 && number >= 20) {
        const tensDigit = Math.floor(number / 10) * 10;
        const onesDigit = number % 10;
        await playAudioFile(tensDigit);
        if (onesDigit !== 0) {
          await playAudioFile(onesDigit);
        }
        break;
      } else {
        await playAudioFile(number);
        number = -1;
      }
    }
  } catch (error) {
    console.error("Error playing sound:", error);
    Alert.alert(
      "Error",
      "There was an error playing the sound. Please try again."
    );
  }
}
