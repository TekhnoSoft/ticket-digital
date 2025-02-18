import React, { useEffect, useState } from 'react'
import FragmentView from '../../components/FragmentView'
import SpaceBox from '../../components/SpaceBox';
import { Card } from '../../components';
import Utils from '../../Utils';
import Api from '../../Api';

export default () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            load();
        }, 1000);

        return () => clearInterval(interval);
    }, []); 

    const load = async () => {
        const { success, data } = await Utils.processRequest(Api.geral.getConexaoCount, {});
        if (success) {
            setCount(data);
        } else {
            setCount(0);
        }
    }

    return (
        <FragmentView headerMode={"USER"}>
            <div className='responsive-margin'>
                <SpaceBox space={8} />
                <h2>Status API</h2>
                <SpaceBox space={15} />
                <Card title={"Numero de Conexões"} icon={<ion-icon name="git-merge-outline"></ion-icon>}>
                    <h3>Conexões: {count}</h3>
                </Card>
                <SpaceBox space={80} />
            </div>
        </FragmentView>
    )
}
