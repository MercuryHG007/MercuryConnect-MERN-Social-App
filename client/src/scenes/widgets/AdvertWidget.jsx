import {
    Typography,
    useTheme
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import FlexBetween from '../../components/FlexBetween';
import WidgetWrapper from '../../components/WidgetWrapper';

const AdvertWidget = () => {
    const {palette} = useTheme();
    const dark = palette.neutral.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium
    const srcs = [1,2,3,4]
    const desc = [
        'Eat Mickey-Lu',
        'Hover Cover',
        'KFC',
        'Mercuryetics'
    ]

    return(
        <WidgetWrapper>
            <FlexBetween>
                <Typography
                    color={dark}
                    variant="h5"
                    fontWeight="500" 
                >
                    Sponsored
                </Typography>
                <Typography
                    color={medium}
                >
                    Create Ad
                </Typography>
            </FlexBetween>
            
            <Carousel
                autoPlay={true}
                indicators={false}
                navButtonsAlwaysInvisible={true}
                interval={3000}
            >
                {srcs.map((num, i) => (
                    <img 
                        key={num}
                        size="contain"
                        width="100%"
                        height="300px"
                        alt="Advert"
                        src={`http://localhost:3001/assets/info${num}.jpeg`}
                        style ={{
                            borderRadius: "1rem",
                            margin: "0.75rem 0",
                        }}
                    />
                ))}
            </Carousel>
            <FlexBetween>
                <Typography
                    color={main}
                >
                    To Publish Ads, Contact Us
                </Typography>
                <Typography
                    color={medium}
                >
                    ads.MercuryConnect.com
                </Typography>
            </FlexBetween>
        </WidgetWrapper>
    )
}

export default AdvertWidget;