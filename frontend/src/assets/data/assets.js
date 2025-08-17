// Import images from assets folder
import logo from '../images/logo.png';
import bg1 from '../images/bg-1.png';
import bg2 from '../images/bg-2.png';
import favicon from '../images/favicon.png';
import youtubebg from '../images/t-bg.jpg'
import defaultimage from '../images/default.jpg'
import download from '../images/download.jpg'

export const images = { logo, favicon ,youtubebg ,defaultimage ,download };

const assets = [
  {
    _id: '1',
    title: 'MIKSHOL – H4383 | சகோ. லாரன்ஸ் சேலம் | Theos Ray Ministry',
    image: bg1,
    logo: logo,
    description: 'இந்த ஆழமான ஆன்மிகப் பாடத்தில், சகோ. லாரன்ஸ் சேலம் அவர்கள் தேவனுடைய வார்த்தையின் ஆழ்ந்த உண்மைகளை பகிர்ந்து கொள்கிறார். வேத ஆராய்ச்சியின் மூலம், MIKSHOL என்ற சொல்லின் அர்த்தம், அதன் பைபிள் சார்ந்த முக்கியத்துவம் மற்றும் நம் ஆன்மிக நடைமுறையில் அதன் தாக்கத்தை விளக்குகிறார்.',
    videoUrl: 'https://youtu.be/8MmN7B6NumY?si=Hqf8wGR_AWXJiGnd'
  },
  {
    _id: '2',
    title: 'சகோ லாரன்ஸ் Salem | A Glimpse into the Wednesday Gathering',
    image: bg2,
    logo: logo,
    description: 'சேலம் நகரில் நடைபெற்ற குல்கோலெத் புதன்கிழமைச் சந்திப்பில் சகோ லாரன்ஸ் வழங்கிய ஆன்மீக செய்தியும் ஊக்கமூட்டும் உரையும் இங்கே. இறைவனின் வார்த்தையால் நம்பிக்கையும், ஆறுதலும், உற்சாகமும் பெற்றுக்கொள்ளும் இந்த நிகழ்ச்சியில், சகோதரத்துவம் மற்றும் அன்பின் சிறப்பை அனுபவிக்கலாம்.',
    videoUrl: 'https://youtu.be/XdnlQGXRtMY?si=rVNanHRaMnHmoBgW'
  }
];

export default assets;
