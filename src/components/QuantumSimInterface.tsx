"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

const QuantumSimInterface = () => {
  const [researchQuestion, setResearchQuestion] = useState('');
  const [tasks, setTasks] = useState([]);
  const [expertFeedback, setExpertFeedback] = useState({});
  const [results, setResults] = useState([]);

  const quantumEquation = 'H(s) = -((1-s)/2) ∑ Jᵢⱼ σᵢᶻ σⱼᶻ - (s/2) ∑ hᵢ σᵢˣ';

  const generateInitialTasks = (question) => {
    return [
      { id: 1, description: "Define quantum annealing parameters", status: "pending", progress: 0 },
      { id: 2, description: "Set up initial state for simulation", status: "pending", progress: 0 },
      { id: 3, description: "Implement annealing schedule", status: "pending", progress: 0 },
      { id: 4, description: "Run simulation and collect data", status: "pending", progress: 0 },
      { id: 5, description: "Analyze results and optimize parameters", status: "pending", progress: 0 }
    ];
  };

  const handleSubmit = () => {
    const initialTasks = generateInitialTasks(researchQuestion);
    setTasks(initialTasks);
    setExpertFeedback({});
    setResults([]);
  };

  const handleTaskProgress = (taskId, progress) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? {...task, progress: Math.min(100, Math.max(0, progress))} : task
    ));
  };

  const handleTaskComplete = (taskId, result) => {
    const newResult = {
      taskId,
      result,
      data: generateGraphData(taskId),
      constraints: {
        temperature: 50, // Placeholder, adjust per task
        coolingRate: 0.95, // Placeholder, adjust per task
        magneticField: 30, // Placeholder, adjust per task
        pressure: 500 // Placeholder, adjust per task
      }
    };
    setResults(prev => [...prev, newResult]);
    setTasks(prev => prev.map(task => 
      task.id === taskId ? {...task, status: "completed", progress: 100} : task
    ));
  };

  const generateGraphData = (taskId) => {
    let data = [];
    const baseFrequency = 0.1 * taskId;
    for (let i = 0; i < 100; i++) {
      data.push({
        x: i,
        y: Math.sin(i * baseFrequency) * 50 + 50 + Math.random() * 10
      });
    }
    return data;
  };

  const findResultForTask = (taskId) => {
    return results.find(result => result.taskId === taskId);
  };

  const InteractiveGraph = ({ data, constraints, onConstraintChange }) => {
    const [adjustedData, setAdjustedData] = useState(data);

    useEffect(() => {
      const factor = (constraints.temperature / 50) * (constraints.coolingRate / 0.95) * (constraints.magneticField / 30);
      const pressureEffect = constraints.pressure / 500;
      const newData = data.map(point => ({
        x: point.x,
        y: point.y * factor * pressureEffect
      }));
      setAdjustedData(newData);
    }, [data, constraints]);

    const maxY = Math.max(...adjustedData.map(d => d.y));

    return (
      <div className="mt-4">
        <div className="w-full h-64 relative overflow-hidden border border-gray-300">
          {adjustedData.map((point, index) => (
            <div
              key={index}
              className="absolute w-1 bg-blue-500"
              style={{
                left: `${(point.x / 100) * 100}%`,
                bottom: `${(point.y / maxY) * 100}%`,
                height: `${(point.y / maxY) * 100}%`
              }}
            />
          ))}
        </div>
        <div className="flex mt-4 justify-between">
          <div>
            <label className="block">Temperature: {constraints.temperature}</label>
            <Slider
              value={[constraints.temperature]}
              onValueChange={([value]) => onConstraintChange('temperature', value)}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div>
            <label className="block">Cooling Rate: {constraints.coolingRate.toFixed(2)}</label>
            <Slider
              value={[constraints.coolingRate * 100]}
              onValueChange={([value]) => onConstraintChange('coolingRate', value / 100)}
              min={80}
              max={99}
              step={1}
            />
          </div>
          <div>
            <label className="block">Magnetic Field: {constraints.magneticField}</label>
            <Slider
              value={[constraints.magneticField]}
              onValueChange={([value]) => onConstraintChange('magneticField', value)}
              min={0}
              max={60}
              step={1}
            />
          </div>
          <div>
            <label className="block">Pressure: {constraints.pressure}</label>
            <Slider
              value={[constraints.pressure]}
              onValueChange={([value]) => onConstraintChange('pressure', value)}
              min={100}
              max={1000}
              step={10}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-2xl font-bold">QuantA: Quantum Annealing Research Interface</h2>
          <p>{quantumEquation}</p>
        </CardHeader>
        <CardContent>
          <Textarea
            value={researchQuestion}
            onChange={(e) => setResearchQuestion(e.target.value)}
            placeholder="Enter your quantum annealing research question..."
            rows={5}
            className="w-full mb-4"
          />
          <Button onClick={handleSubmit}>Generate Research Tasks</Button>
        </CardContent>
      </Card>

      {tasks.map((task) => (
        <Card key={task.id} className="mb-4">
          <CardHeader>
            <h2 className="text-xl font-bold">Task {task.id}: {task.description}</h2>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 border rounded">
              <p className="mb-2">Status: {task.status}</p>
              <Progress value={task.progress} className="mb-2" />
              {task.status === "pending" && (
                <div>
                  <Input
                    type="number"
                    placeholder="Enter progress (0-100)"
                    onChange={(e) => handleTaskProgress(task.id, parseInt(e.target.value, 10))}
                    className="w-full mb-2"
                  />
                  <Input
                    placeholder="Enter task result"
                    onChange={(e) => handleTaskComplete(task.id, e.target.value)}
                    className="w-full mb-2"
                  />
                  <Button onClick={() => handleTaskComplete(task.id, "Completed")}>
                    Mark as Completed
                  </Button>
                </div>
              )}
              <Textarea
                value={expertFeedback[task.id] || ''}
                onChange={(e) => handleExpertFeedback(task.id, e.target.value)}
                placeholder="Expert feedback..."
                rows={3}
                className="w-full mt-2"
              />
            </div>
            {findResultForTask(task.id) && (
              <InteractiveGraph
                data={findResultForTask(task.id).data}
                constraints={findResultForTask(task.id).constraints}
                onConstraintChange={(constraint, value) => {
                  setResults(prev => prev.map((r) => 
                    r.taskId === task.id ? {...r, constraints: {...r.constraints, [constraint]: value}} : r
                  ));
                }}
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuantumSimInterface;
