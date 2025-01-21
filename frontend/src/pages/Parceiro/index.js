import React, { useState } from 'react'
import FragmentView from '../../components/FragmentView'
import Input from '../../components/Input'
import SpaceBox from '../../components/SpaceBox';

export default () => {

    const [search, setSearch] = useState("");

    return (
        <FragmentView headerMode={"PARCEIRO"}>
            <SpaceBox space={8}/>
            <h2>Campanhas</h2>
            <SpaceBox space={15}/>
            <div className='search-box'>
                <Input type={"text"} hideInputBoxMargin label={"Pesquisar..."} value={search} setValue={setSearch}/>
            </div>
        </FragmentView>
    )
}
