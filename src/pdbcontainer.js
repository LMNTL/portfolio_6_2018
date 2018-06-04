import React, { Component } from 'react';
import * as THREE from 'three';
import { PDBLoader } from 'three-full';
import './pdbcontainer.css';

let gifEncoder = null;

export default class PDBContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rotating: false,
      url: '',
      lastFrame: 0,
      useFallback: false,
      loading: true
    }
  }

  componentDidMount() {
    this.startRendering();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  startRendering = () => {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )



    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.shadowMapEnabled = true;
    //scene.background = new THREE.Color('#22aa55');

    camera.position.z = 150;
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(width, height);
    const clock = new THREE.Clock();

    this.clock = clock;
    this.scene = scene
    this.camera = camera
    this.renderer = renderer

    this.loadMolecule("https://s3.us-east-2.amazonaws.com/jsthomas-portfolio/4r70.pdb");
    this.mount.appendChild(this.renderer.domElement);
    this.start();
    this.setState({loading: false});
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    const sinceLastFrame = this.clock.getDelta();
    if(this.state.rotating){
      this.root.rotateY(0.1*sinceLastFrame);
      this.root.rotateX(0.04*sinceLastFrame);
    } else {
      this.setState({rotating: true});
    }
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  loadMolecule = (url) => {
    var root = new THREE.Group();
    this.root = root;
    root.scale.set(0.02, 0.02, 0.02);
    this.scene.add( root );
    while ( root.children.length > 0 ) {
      let object = root.children[ 0 ];
      object.parent.remove( object );
    }
    var loader = new PDBLoader();
    var offset = new THREE.Vector3();
    loader.load( url, function ( pdb ) {
      try{
        var geometryAtoms = pdb.geometryAtoms;
        var geometryBonds = pdb.geometryBonds;
        var json = pdb.json;
        var boxGeometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        var sphereGeometry = new THREE.IcosahedronBufferGeometry( 1, 2 );
        geometryAtoms.computeBoundingBox();
        geometryAtoms.boundingBox.getCenter( offset ).negate();
        geometryAtoms.translate( offset.x, offset.y, offset.z );
        geometryBonds.translate( offset.x, offset.y, offset.z );
        var positions = geometryAtoms.getAttribute( 'position' );
        var colors = geometryAtoms.getAttribute( 'color' );
        var position = new THREE.Vector3();
        var color = new THREE.Color();
        for ( var i = 0; i < positions.count; i += 5 ) {
          position.x = positions.getX( i );
          position.y = positions.getY( i );
          position.z = positions.getZ( i );
          color.r = colors.getX( i );
          color.g = colors.getY( i );
          color.b = colors.getZ( i );
          var material = new THREE.MeshNormalMaterial( { color: color } );
          var object = new THREE.Mesh( sphereGeometry, material );
          object.position.copy( position );
          object.position.multiplyScalar( 75 );
          object.scale.multiplyScalar( 300 );
          root.add( object );
        }
        positions = geometryBonds.getAttribute( 'position' );
        var start = new THREE.Vector3();
        var end = new THREE.Vector3();
        for ( var i = 0; i < positions.count; i += 2 ) {
          start.x = positions.getX( i );
          start.y = positions.getY( i );
          start.z = positions.getZ( i );
          end.x = positions.getX( i + 1 );
          end.y = positions.getY( i + 1 );
          end.z = positions.getZ( i + 1 );
          start.multiplyScalar( 75 );
          end.multiplyScalar( 75 );
          var object = new THREE.Mesh( boxGeometry, new THREE.MeshPhongMaterial( 0xffffff ) );
          object.position.copy( start );
          object.position.lerp( end, 0.5 );
          object.scale.set( 5, 5, start.distanceTo( end ) );
          object.lookAt( end );
          root.add( object );
        }
      } catch(error){
        console.log(error);
        this.setState({useFallback: true, loading: false})
      }
    } );
  }

  render() {
    return (
      <div
        style={{ width: '400px', height: '400px' }}
        className='threecanvas'
        ref={(mount) => { this.mount = mount }}
      >
        {this.state.loading ? <div className='loader'/> : null}
        {this.state.useFallback ? <img src='./pdbfallback.jpg'/> : null}
      </div>
    );
  }
}

