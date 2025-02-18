import React, { useEffect, useState } from 'react'
import FragmentView from '../../components/FragmentView'
import SpaceBox from '../../components/SpaceBox';
import { Card } from '../../components';
import Utils from '../../Utils';
import Api from '../../Api';

export default () => {
    const [count, setCount] = useState(0);
    const [arrecadacao, setArrecadacao] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            load();
        }, 1000);

        return () => clearInterval(interval);
    }, []); 

    const load = async () => {
        const { success, data } = await Utils.processRequest(Api.geral.getConexaoCount, {});
        if (success) {
            setCount(data?.conexoes);
            setArrecadacao(data?.arrecadacao);
        } else {
            setCount(0);
        }
    }

    return (
        <FragmentView headerMode={"USER"}>
            <div className='responsive-margin'>
                <SpaceBox space={30} />
                <h2>Status API</h2>
                <SpaceBox space={30} />
                <Card title={"Numero de conexões no banco"} icon={<ion-icon name="git-merge-outline"></ion-icon>}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <label>Conexões:&nbsp;&nbsp;&nbsp;</label>
                        <h3>{count}</h3>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <label>Arrecadação:&nbsp;&nbsp;&nbsp;</label>
                        <h3>{Utils.convertNumberToBRL(arrecadacao || 0)}</h3>
                    </div>
                </Card>
                <SpaceBox space={80} />
            </div>
        </FragmentView>
    )
}
