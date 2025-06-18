import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

type ExercisePart = {
  percentage: number;
  sets: number;
  reps: number;
  loadKg: number;
};

type Exercise = {
  name: string;
  type: string;
  exerciseParts: ExercisePart[];
};

type TrainingDay = {
  dayNumber: number;
  dayStructure: Exercise[];
};

type TrainingWeek = {
  weekNumber: number;
  weekStructure: TrainingDay[];
};

export default function HypertrophyProgramDetails() {
  const savedUser = localStorage.getItem('currentUser');
  const userData = savedUser ? JSON.parse(savedUser) : null;

  const [age, setAge] = useState(userData?.age || 25);
  const [weight, setWeight] = useState(userData?.weight || 70);
  const [height, setHeight] = useState(userData?.height || 175);
  const [activityLevel, setActivityLevel] = useState<'BEGINNER'|'INTERMEDIATE'|'ADVANCED'>('INTERMEDIATE');
  const [loading, setLoading] = useState(false);
  const [benchPr, setBenchPr] = useState(userData?.benchPr || 0);
  const [squatPr, setSquatPr] = useState(userData?.squatPr || 0);
  const [deadliftPr, setDeadliftPr] = useState(userData?.deadliftPr || 0);
  const [program, setProgram] = useState<TrainingWeek[]>([]);

  const onGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hypertrophy/cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, weight, height, benchPr, squatPr, deadliftPr }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data: TrainingWeek[] = await response.json();
      setProgram(data);
    } catch (error) {
      console.error(error);
      alert('The program could not be generated');
    } finally {
      setLoading(false);
    }
  };

  function exportPdf(program: TrainingWeek[]) {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 40;
    
    doc.setFillColor(254, 215, 215);
    doc.rect(0, 0, pageWidth, 100, 'F');
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 80, pageWidth, 40, 'F');
    
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(margin, 15, 60, 60, 5, 5, 'FD');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(80, 80, 80);
    doc.text('Training Plan', margin + 80, 40);
    
    doc.setFontSize(18);
    doc.text('Hypertrophy Program', margin + 80, 65);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Age: ${age} | Weight: ${weight} kg | Height: ${height} cm`, margin, 110);
    doc.text(`Bench: ${benchPr} kg | Squat: ${squatPr} kg | Deadlift: ${deadliftPr} kg`, margin, 125);
    
    const today = new Date();
    doc.setFontSize(10);
    doc.text(`Created: ${today.toLocaleDateString()}`, pageWidth - margin - 100, 125);
    
    const weeklyData: Record<number, {
      weekNum: number,
      days: Record<number, {
        dayNum: number,
        exercises: {
          name: string,
          parts: ExercisePart[],
          type: string
        }[]
      }>
    }> = {};
    
    program.forEach(week => {
      weeklyData[week.weekNumber] = {
        weekNum: week.weekNumber,
        days: {}
      };
      
      week.weekStructure.forEach(day => {
        weeklyData[week.weekNumber].days[day.dayNumber] = {
          dayNum: day.dayNumber,
          exercises: day.dayStructure.map(ex => ({
            name: ex.name,
            parts: ex.exerciseParts,
            type: ex.type
          }))
        };
      });
    });
    
    let yPosition = 145;
    const weekKeys = Object.keys(weeklyData).map(Number).sort((a, b) => a - b);
    
    weekKeys.forEach(weekNum => {
      const week = weeklyData[weekNum];
      
      if (yPosition > pageHeight - 200) {
        doc.addPage();
        yPosition = margin;
      } else if (weekNum > 1) {
        yPosition += 20;
      }
      
      doc.setFillColor(120, 75, 58, 0.1);
      doc.rect(margin, yPosition, pageWidth - (margin * 2), 30, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(120, 75, 58);
      doc.text(`Week ${weekNum}`, margin + 10, yPosition + 20);
      
      yPosition += 40;
      
      const dayKeys = Object.keys(week.days).map(Number).sort((a, b) => a - b);
      
      dayKeys.forEach(dayNum => {
        const day = week.days[dayNum];
        
        if (yPosition > pageHeight - 150) {
          doc.addPage();
          yPosition = margin;
        }
        
        doc.setFillColor(220, 220, 220);
        doc.rect(margin, yPosition, pageWidth - (margin * 2), 25, 'F');
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(80, 80, 80);
        doc.text(`Day ${dayNum}`, margin + 10, yPosition + 17);
        
        yPosition += 35;
        
        const rows: (string|number)[][] = [];
        
        day.exercises.forEach(ex => {
          ex.parts.forEach(part => {
            rows.push([
              ex.name,
              `${part.percentage}%`,
              part.reps,
              part.sets,
              part.loadKg.toFixed(1),
            ]);
          });
        });
        
        autoTable(doc, {
          startY: yPosition,
          margin: { left: margin, right: margin },
          tableWidth: pageWidth - (margin * 2),
          head: [['Exercise', '% 1RM', 'Reps', 'Sets', 'Weight (kg)']],
          body: rows,
          styles: { 
            fontSize: 11, 
            cellPadding: 6,
            lineColor: [200, 200, 200],
            lineWidth: 0.1
          },
          headStyles: {
            fillColor: [254, 215, 215],
            textColor: [80, 80, 80],
            fontStyle: 'bold',
            halign: 'center'
          },
          columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 60, halign: 'center' },
            2: { cellWidth: 60, halign: 'center' },
            3: { cellWidth: 60, halign: 'center' },
            4: { cellWidth: 80, halign: 'center' }
          },
          alternateRowStyles: {
            fillColor: [248, 248, 248]
          },
          theme: 'grid'
        });
        
        yPosition = (doc as any).lastAutoTable.finalY + 30;
      });
    });
    
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, pageHeight - 50, pageWidth - margin, pageHeight - 50);
      
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 60, pageHeight - 30);
      
      doc.text('PowerCycles', margin, pageHeight - 30);
    }
    
    doc.save('hypertrophy_program.pdf');
  }

  async function exportExcel(program: TrainingWeek[]) {
    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('Program', {
      views: [{ state: 'frozen', ySplit: 1 }]
    });

    ws.columns = [
      { header: 'Day',      key: 'day',      width: 12 },
      { header: 'Exercise',  key: 'exercise', width: 30 },
      { header: '% 1RM',     key: 'pct',      width: 10 },
      { header: 'Reps',      key: 'reps',     width: 8  },
      { header: 'Sets',      key: 'sets',     width: 8  },
      { header: 'Weight(kg)', key: 'load',     width: 10 },
    ];
    ws.getRow(1).eachCell(cell => {
      cell.font      = { bold: true };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.fill      = {
        type: 'pattern', pattern: 'solid',
        fgColor: { argb: 'FFFED7D7' }
      };
      cell.border    = {
        bottom: { style: 'thick', color: { argb: 'FFCCCCCC' } }
      };
    });

    let rowIndex = 2;
    program.forEach(week => {
      week.weekStructure.forEach((day, dayIdx) => {
        const startRow = rowIndex;
        day.dayStructure.forEach(ex => {
          ws.addRow({
            day: `Day ${day.dayNumber}`,
            exercise: ex.name,
            pct: `${ex.exerciseParts[0].percentage}%`,
            reps: ex.exerciseParts[0].reps,
            sets: ex.exerciseParts[0].sets,
            load: ex.exerciseParts[0].loadKg.toFixed(1)
          });
          rowIndex++;
        });
        const endRow = rowIndex - 1;

        ws.mergeCells(startRow, 1, endRow, 1);
        const mergedCell = ws.getCell(startRow, 1);
        mergedCell.fill      = {
          type: 'pattern', pattern: 'solid',
          fgColor: { argb: 'FFDFF7DF' }
        };
        mergedCell.alignment = { vertical: 'top', horizontal: 'center' };
        mergedCell.font      = { bold: true };

        const isLastDayOfWeek = dayIdx === week.weekStructure.length - 1;
        const borderStyle = isLastDayOfWeek ? 'thick' : 'double';
        const borderColor = isLastDayOfWeek ? 'FF444444' : 'FF888888';

        ws.getRow(endRow).eachCell(cell => {
          cell.border = {
            bottom: { style: borderStyle as any, color: { argb: borderColor } }
          };
        });
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'hypertrophy_program.xlsx');
  }

  return (
    <div className="flex-1 bg-[#eeeeee] border-t-12 border-[#D0D0D0]">
      <div className="relative rounded-xl mt-8 lg:mx-8 bg-white p-4 lg:p-8 text-gray-800 text-[17px] leading-relaxed">
      <div className="flex flex-col lg:flex-row lg:gap-3">
        <div className="flex-1 pr-0 lg:pr-8">
          <h1 className="text-3xl font-poppins font-semibold mb-6">Hypertrophy cycle</h1>
          <p className="mb-4">
            This hypertrophy cycle is designed for intermediate-level athletes who aim to effectively increase muscle cross-sectional area. The program is oriented toward athletes with 1-3 years of gym experience, provided they follow a regimen, proper load dosing, and nutrition, and are motivated to increase muscle mass. The cycle is built using wave periodization and a "full-body" system. Preference is given to compound exercises, but there are also isolation exercises designed to add load to individual muscle groups.
          </p>
          <p className="font-poppins font-semibold mb-2 text-[#6a4133]">
            Conditions for performing the cycle:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 marker:text-[#6a4133]">
            <li>If the athlete has any injury in the acute phase, then it is not recommended to start the cycle.</li>
            <li>The cycle includes three workouts within a weekly microcycle. On other days the athlete may perform a light warm-up or flexibility exercises. Intensive physical exercises on rest days are not recommended.</li>
            <li>Enter your data to receive a personalized program.</li>
          </ul>
        </div>
        <div className="w-full lg:w-80 mt-6 lg:mt-0">
          <img
            src="/hypertr_mid.png"
            alt="Hypertrophy cycle"
            className="hidden lg:block w-full h-70 object-cover rounded-xl shadow mb-6"
          />
          <div className="space-y-4 mb-6">
            <div>
              <label className="block mb-1">Age:</label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Weight (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Height (cm):</label>
              <input
                type="number"
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Training level:</label>
              <select
                value={activityLevel}
                onChange={e => setActivityLevel(e.target.value as any)}
                className="w-full p-2 border rounded"
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Your bench press PR:</label>
              <input
                type="number"
                value={benchPr}
                onChange={e => setBenchPr(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Your squat PR:</label>
              <input
                type="number"
                value={squatPr}
                onChange={e => setSquatPr(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-poppins">Your dead lift PR:</label>
              <input
                type="number"
                value={deadliftPr}
                onChange={e => setDeadliftPr(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            onClick={onGenerate}
            disabled={loading}
            className="w-full bg-[#7B4B3A] text-white font-poppins px-5 py-2.5 rounded hover:opacity-90 hover:cursor-pointer"
          >
            {loading ? 'Generation...' : 'Generate program'}
          </button>
          {program.length > 0 && (
            <>
              <button
                className="w-full mt-8 px-5 py-2.5 bg-[#b94018] text-white font-poppins rounded hover:opacity-90 hover:cursor-pointer"
                onClick={() => exportPdf(program)}
              >
                Download PDF
              </button>
              <button
                onClick={() => exportExcel(program)}
                className="w-full mt-5 px-5 py-2.5 bg-[#36b918] text-white font-poppins rounded hover:opacity-90 hover:cursor-pointer"
              >
                Download Excel
              </button>
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
