import React , {useState}         from 'react';
import {useCallback, useEffect}   from 'react';
import CircularProgress           from '@material-ui/core/CircularProgress';
import Tabs                       from '@material-ui/core/Tabs';
import Tab                        from '@material-ui/core/Tab';
import Grid                       from '@material-ui/core/Grid';

import EncoderForm                from '../EncoderForm/EncoderForm';
import InputForm                  from '../InputForm/InputForm';
import ResponseTable              from '../EncoderResponse/ResponseTable';
import EventEmitter               from '../../EventEmitter/EventEmiter';
import ConfirmationDialog         from '../Modal/ConfirmationDialog';
import {encode}                   from '../../services/EncodingService';
import CodeTable                  from '../CodeTable/CodeTable';
import TabPanel                   from '../TabPanel/TabPanel';
import DecoderForm                from '../DecoderForm/DecoderForm';
import {decode}                   from '../../services/DecodingService';
import styles                     from './HomePage.style';
import DecoderResponse from "../DecoderResponse/DecoderResponse";


export default function HomePage() {

    const classes = styles();
    const [pairs, setPairs] = useState([]);

    const [encoderResponse, setEncoderResponse] = useState({});
    const [decoderResponse, setDecoderResponse] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentTab,setCurrentTab] = useState(0);

    const addNewPair = useCallback((pair) => {
        const indexOfPair = pairs.findIndex(pairElement => pairElement.symbol === pair.symbol);
        if ( indexOfPair >= 0 ) {
            const localPairs = [...pairs];
            localPairs[indexOfPair] = pair;
            setPairs(localPairs);
        } else {
            setPairs([...pairs, pair]);
        }
    }, [pairs]);

    const closeModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    const closeModalAndClear = useCallback(() => {
        setModalOpen(false);
        setPairs([]);
    }, []);


    useEffect(() => {
        EventEmitter.subscribe('addPair',pair => addNewPair(pair));
        EventEmitter.subscribe('cancelDeletion', event => closeModal(event));
        EventEmitter.subscribe('confirmDeletion', event => closeModalAndClear(event))
    },[addNewPair, closeModal, closeModalAndClear]);


    const calculateSumOfProbabilities = () => {
        let sum = 0.0 ;
        pairs.forEach(pair => sum += parseFloat(pair.probability));
        return sum;
    };
    const getEncodedResults = async (payload) => {
        setLoading(true);
        const data = await encode(payload);
        setEncoderResponse(data);
        setTimeout( () => setLoading(false),1000);
    };
    const deletePair = (symbol) => {
        setPairs(pairs.filter(pair => pair.symbol !== symbol));
    };
    const editPairPair = (symbol) => {
        const editObject = pairs.find(pair => pair.symbol === symbol);
        EventEmitter.dispatch('editPair', editObject);
    };
    const clearTable = () => {
        setModalOpen(true);
    };
    const handleTabChange = (event, currentTabIndex) => {
        setCurrentTab(currentTabIndex);
    };
    const generateTabProps = (index) => {
      return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
      }
    };
    const getDecoderResults = async (payload) => {
        setLoading(true);
        const data = await decode(payload);
        setDecoderResponse({data});
        setTimeout( () => setLoading(false),1000);
    };
    return (
        <div className={classes.root}>
            <Tabs
                value={currentTab}
                indicatorColor='primary'
                textColor='primary'
                onChange={handleTabChange}
            >
                <Tab label='Encoder' {...generateTabProps(0)}/>
                <Tab label='Decoder(Arithmetic)' {...generateTabProps(1)}/>
            </Tabs>
            <TabPanel value={currentTab} index={0}>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <InputForm pairs={pairs} />
                    </Grid>
                    <Grid item xs={6}>
                        <EncoderForm
                            pairs={pairs}
                            sumProbabilities={calculateSumOfProbabilities}
                            getResults={getEncodedResults}
                            type={'encoder'}
                        />
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <CodeTable
                                pairs={pairs}
                                clearTable={clearTable}
                                deletePair={deletePair}
                                editPairPair={editPairPair}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            { isLoading ?
                                <div className={classes.loader}>
                                    <CircularProgress/>
                                </div>
                                :
                                <ResponseTable response={encoderResponse}/>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <InputForm pairs={pairs} />
                    </Grid>
                    <Grid item xs={6}>
                        <DecoderForm
                            pairs={pairs}
                            sumProbabilities={calculateSumOfProbabilities}
                            getResults={getDecoderResults}
                        />
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <CodeTable
                                pairs={pairs}
                                clearTable={clearTable}
                                deletePair={deletePair}
                                editPairPair={editPairPair}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            { isLoading ?
                                <div className={classes.loader}>
                                    <CircularProgress/>
                                </div>
                                :
                                Object.keys(encoderResponse).length ?
                                <ResponseTable response={encoderResponse}/>
                                :
                                    <DecoderResponse {...decoderResponse}/>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel>
            <ConfirmationDialog
                title={'Are you sure?'}
                contentText={'Are you sure to delete all records in table'}
                open={isModalOpen}
            />
        </div>
    );
}
