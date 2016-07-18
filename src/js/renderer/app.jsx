'use strict';

import React from 'react';
import ReactDom from 'react-dom';

const remote = window.require('remote');
const dialog = remote.require('dialog');
const browserWindow = remote.require('browser-window');
const sepalatedText = remote.require('./dist/js/common/sepalated_text');

class FolderButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {reloadFunc: this.props.reloadFunc};
    }
    click() {
        dialog.showOpenDialog({
            title: 'chose csv file',
            properties: ['openFile'],
            filters: [{
                name: 'csvファイル',
                extensions: ['txt','csv','tsv']
            }]
        }, (files) => {
            if (files === undefined) {
                return;
            }
            let file;
            files.forEach(function(f) {
                file = f;
            });
            this.props.tabRenameFunc(file);
            sepalatedText.readAsync(file, (output)=>{
                this.state.reloadFunc(output);
                console.log("done");
            });
        });
    }
    render() {
        return (
            <button className="btn btn-default" onClick={this.click.bind(this)}>
            <span className="icon icon-folder"></span>
            </button>
        );
    }
}

class ToolBarAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {reloadFunc: this.props.reloadFunc, tabRenameFunc: this.props.tabRenameFunc};
    }

    render() {
        return (<div className="toolbar-actions">
                <FolderButton reloadFunc={this.state.reloadFunc} tabRenameFunc={this.state.tabRenameFunc}/>
                </div>);
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={reloadFunc: this.props.reloadFunc, tabRenameFunc: this.props.tabRenameFunc};
    }
    render() {
        return (<header className="toolbar toolbar-header">
                <h1 className="title">CSV Viewer</h1>
                <ToolBarAction reloadFunc={this.state.reloadFunc} tabRenameFunc={this.state.tabRenameFunc}/>
                </header>);
    }
}

class Tab extends React.Component {
    render() {
        return (
            <div className="tab-item">
              <span className="icon icon-cancel icon-close-tab"></span>
              {this.props.name}
            </div>
        );
    }
}

class TabGroup extends React.Component {
    render() {
        let tabs = [];
        this.props.tabs.forEach(function(tab, i){
            tabs.push(<Tab name={tab} key={i} />);
        });
        return (
            <div className="tab-group">
              {tabs}
            </div>
        );
    }
}

class HeaderCell extends React.Component {
    render() {
        return (<th>{this.props.col}</th>);
    }
}

class TableHeader extends React.Component {
    render() {
        let doms = [];
        this.props.cols.forEach(function(col, i){
            doms.push(<HeaderCell key={i} col={col} />);
        });
        return (
            <thead>
              <tr>
                {doms}
              </tr>
            </thead>
        );
    }
}

class TableCell extends React.Component {
    render() {
        return (<td>{this.props.data}</td>);
    }
}

class TableRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {row: this.props.row};
    }
    render() {
        let cells = [];
        this.props.row.forEach(function(data, i){
            cells.push(<TableCell key={i} data={data}/>);
        });
        return (
            <tr>
              {cells}
            </tr>
        );
    }
}

class Table extends React.Component {
    render() {
        let dom_rows = [];
        this.props.table_data.forEach(function(row, i) {
            dom_rows.push(<TableRow key={i}  row={row}/>);
        });
        return (
            <table className="table-striped">
              <TableHeader cols={this.props.table_header}/>
              <tbody>
                {dom_rows}
              </tbody>
            </table>
        );
    }
}

class MainView extends React.Component {
    render() {
        return (
            <div className="window-content">
              <div className="pane-group">
                <Table table_header={this.props.table_header} table_data={this.props.table_data}/>
              </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {table_header:[], table_data: [], tabs:[]};
    }
    resetTabName(file_name) {
        let tabs = this.state.tabs;
        tabs.push(file_name);
        this.setState({tabs: tabs});
    }
    reloadTable(output) {
        this.setState({table_header: output.shift(), table_data: output});
    }
    render() {
        return (
            <div className="window">
              <Header reloadFunc={this.reloadTable.bind(this)} tabRenameFunc={this.resetTabName.bind(this)}/>
              <TabGroup tabs={this.state.tabs}/>
              <MainView table_header={this.state.table_header} table_data={this.state.table_data}/>
            </div>
        );
    }
}

ReactDom.render(
    <App/>,
    document.querySelector('.container')
);
