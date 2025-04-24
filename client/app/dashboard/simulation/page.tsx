// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { Stage, Layer, Rect, Text, Group, Circle } from 'react-konva';

// const homeStructure = [
//   { id: 'room1', x: 50, y: 50, width: 300, height: 200 },
//   { id: 'room2', x: 400, y: 50, width: 300, height: 200 },
// ];

// const instituteStructure = [
//   { id: 'classroom1', x: 50, y: 50, width: 400, height: 300 },
//   { id: 'classroom2', x: 500, y: 50, width: 400, height: 300 },
// ];

// const initialAppliances = [
//   { id: 'ac1', type: 'AC', x: 150, y: 120, temp: 24.2, humidity: 65, isOn: false },
//   { id: 'fan1', type: 'Fan', x: 250, y: 120, temp: 26.7, humidity: 55, isOn: false },
//   { id: 'light1', type: 'Light', x: 350, y: 120, temp: 0, humidity: 0, isOn: false },
// ];

// export default function SimulationPage() {
//   const [hovered, setHovered] = useState<string | null>(null);
//   const [stageWidth, setStageWidth] = useState<number>(window.innerWidth); // Dynamic width
//   const [stageHeight, setStageHeight] = useState<number>(600); // Fixed height
//   const [structure, setStructure] = useState<any[]>(homeStructure);
//   const [appliances, setAppliances] = useState(initialAppliances);
//   const [selectedAppliance, setSelectedAppliance] = useState<string | null>(null);
//   const stageRef = useRef<any>(null); // Store reference to stage for resizing

//   const handleResize = () => {
//     setStageWidth(window.innerWidth); // Resize dynamically
//   };

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const handleStructureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     if (event.target.value === 'home') {
//       setStructure(homeStructure);
//     } else {
//       setStructure(instituteStructure);
//     }
//   };

//   const handleDragMove = (id: string, x: number, y: number) => {
//     const updatedAppliances = appliances.map((appliance) =>
//       appliance.id === id ? { ...appliance, x, y } : appliance
//     );
//     setAppliances(updatedAppliances);
//     localStorage.setItem('appliances', JSON.stringify(updatedAppliances));
//   };

//   const handleDrop = (e: any) => {
//     if (!selectedAppliance) return;
//     const newAppliance = {
//       id: `${selectedAppliance}-${Date.now()}`,
//       type: selectedAppliance,
//       x: e.target.x(),
//       y: e.target.y(),
//       temp: 24.2,
//       humidity: 65,
//       isOn: false,
//     };
//     const updatedAppliances = [...appliances, newAppliance];
//     setAppliances(updatedAppliances);
//     localStorage.setItem('appliances', JSON.stringify(updatedAppliances));
//   };

//   const toggleAppliance = (id: string) => {
//     const updatedAppliances = appliances.map((appliance) =>
//       appliance.id === id ? { ...appliance, isOn: !appliance.isOn } : appliance
//     );
//     setAppliances(updatedAppliances);
//     localStorage.setItem('appliances', JSON.stringify(updatedAppliances));
//   };

//   useEffect(() => {
//     const savedAppliances = localStorage.getItem('appliances');
//     if (savedAppliances) {
//       setAppliances(JSON.parse(savedAppliances));
//     }
//   }, []);

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold text-center text-blue-600">Simulation Canvas</h1>

//       {/* Structure Selection */}
//       <div className="flex justify-center">
//         <label className="mr-4">Select Structure:</label>
//         <select onChange={handleStructureChange} className="border p-2">
//           <option value="home">Home</option>
//           <option value="institute">Institute</option>
//         </select>
//       </div>

//       {/* Appliance Toolbar */}
//       <div className="flex justify-center space-x-4 mt-4">
//         <button
//           onClick={() => setSelectedAppliance('AC')}
//           className="p-3 border rounded bg-blue-200 hover:bg-blue-300"
//         >
//           AC
//         </button>
//         <button
//           onClick={() => setSelectedAppliance('Fan')}
//           className="p-3 border rounded bg-orange-200 hover:bg-orange-300"
//         >
//           Fan
//         </button>
//         <button
//           onClick={() => setSelectedAppliance('Light')}
//           className="p-3 border rounded bg-yellow-200 hover:bg-yellow-300"
//         >
//           Light
//         </button>
//       </div>

//       {/* Canvas Area */}
//       <div className="border rounded-lg shadow bg-white w-full h-[500px] mt-6">
//         <Stage width={stageWidth} height={stageHeight} ref={stageRef} onClick={handleDrop}>
//           <Layer>
//             {/* Draw Selected Structure */}
//             {structure.map((room) => (
//               <Rect
//                 key={room.id}
//                 x={room.x}
//                 y={room.y}
//                 width={room.width}
//                 height={room.height}
//                 stroke="black"
//                 strokeWidth={2}
//                 fill="lightgray"
//                 shadowBlur={10}
//                 cornerRadius={15} // Rounded corners for rooms
//               />
//             ))}

//             {/* Place Appliances */}
//             {appliances.map((appliance) => (
//               <Group
//                 key={appliance.id}
//                 x={appliance.x}
//                 y={appliance.y}
//                 draggable
//                 onDragMove={(e) => handleDragMove(appliance.id, e.target.x(), e.target.y())}
//                 onMouseEnter={() => setHovered(appliance.id)}
//                 onMouseLeave={() => setHovered(null)}
//               >
//                 {appliance.type === 'AC' && (
//                   <Circle
//                     radius={30}
//                     fill={appliance.isOn ? 'blue' : 'lightblue'}
//                     stroke="black"
//                     strokeWidth={2}
//                   />
//                 )}
//                 {appliance.type === 'Fan' && (
//                   <Circle
//                     radius={30}
//                     fill={appliance.isOn ? 'orange' : 'lightyellow'}
//                     stroke="black"
//                     strokeWidth={2}
//                   />
//                 )}
//                 {appliance.type === 'Light' && (
//                   <Circle
//                     radius={30}
//                     fill={appliance.isOn ? 'yellow' : 'lightgray'}
//                     stroke="black"
//                     strokeWidth={2}
//                   />
//                 )}

//                 {hovered === appliance.id && (
//                   <Text
//                     x={60}
//                     y={-20}
//                     text={`Temp: ${appliance.temp}°C\nHumidity: ${appliance.humidity}%`}
//                     fontSize={14}
//                     fill="black"
//                   />
//                 )}
//               </Group>
//             ))}
//           </Layer>
//         </Stage>
//       </div>

//       {/* Toggle Buttons for Appliances */}
//       <div className="mt-4 flex justify-center space-x-4">
//         {appliances.map((appliance) => (
//           <div key={appliance.id} className="mb-2">
//             <button
//               onClick={() => toggleAppliance(appliance.id)}
//               className={`p-3 border rounded ${
//                 appliance.isOn ? 'bg-green-200' : 'bg-red-200'
//               }`}
//             >
//               Turn {appliance.isOn ? 'Off' : 'On'} {appliance.type}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
