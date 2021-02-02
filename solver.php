<?php 
    class SudokuSolver {
        public function __construct($puzzle) {
            $this->board = $puzzle;
            $this->solutionCount = 0;
            $this->solutions= [];
            $this->visualiserMap = [];
        }
        public function solve($validate = false) {
            $row = null;
            $col = null;
            $numbers = [1,2,3,4,5,6,7,8,9];
        
            foreach ($this->board_positions(0) as $pos) {
                $candidates = array();
                for($num = 1; $num < 10; $num++) {
                    if(!in_array($num, $this->board[$pos[0]]) && 
                    !in_array($num, $this->column($pos[1])) && 
                    !in_array($num, $this->box($pos[0], $pos[1]))) {
                        array_push($candidates, $num);
                    }
                }
                if(count($candidates) <= count($numbers)) {
                    $row = $pos[0];
                    $col = $pos[1];
                    $numbers = $candidates;
                }
            }
            if($row === null) {
                
                if($validate) {
                   array_push($this->solutions, $this->board);
                   if(count($this->solutions) > 1) {
                        return 'invalid';
                   }
                   return false;
                }
                return $this->board;
            }

            while (count($numbers) > 0) {
                $randInd = rand(0, count($numbers)-1);
                $this->board[$row][$col] = $numbers[$randInd];

                array_push($this->visualiserMap, [
                    'cell'=> "c{$row}{$col}",
                    'value'=> $numbers[$randInd]
                ]);
                array_splice($numbers, $randInd, 1);

                $next = $this->solve($validate);
                if($next) {
                    return $next;
                }
                $this->board[$row][$col] = 0;

                array_push($this->visualiserMap, [
                    'cell'=> "c{$row}{$col}",
                    'value'=> 0
                ]);
            }
            
            return false;

    
        }
        public function board_positions($number = -1) {
            $positions = array();
            for ($row=0; $row < 9 ; $row++) { 
                for ($col=0; $col < 9 ; $col++) { 
                    if($number === -1) {
                        array_push($positions, [$row, $col]);
                    }elseif ($this->board[$row][$col] === $number) {
                        array_push($positions, [$row, $col]);
                    } 
                }
            }
            return $positions;
        }
   
        public function column($number) {
            $column = [];
            foreach ($this->board as $row) {
                // var_dump($row);
                array_push($column, $row[$number]);
            }
            return $column;
        }
        public function box($row, $col) {
            $spans = [[0, 3], [3, 6], [6,9]];
            $box = array();
            foreach ($spans as $span) {
                if($row >= $span[0] && $row < $span[1]) {
                    $box['rows'] = $span;
                }
                if($col >= $span[0] && $col < $span[1]) {
                    $box['cols'] = $span;
                }
            }
           
            $boxNums = array();
            $boxRows = array_slice($this->board, $box['rows'][0], 3);
            foreach ($boxRows as $row) {
                $col = array_slice($row, $box['cols'][0], 3);
                $boxNums = array_merge($boxNums, $col);
               
            }
            return $boxNums;
        }
    }
    $s =  [[5, 0, 0, 0, 6, 1, 4, 0, 0],
           [0, 3, 0, 8, 4, 2, 0, 6, 0],
           [0, 0, 0, 0, 0, 6, 0, 0, 0],
           [0, 1, 0, 0, 0, 0, 0, 3, 0],
           [0, 0, 8, 0, 0, 0, 3, 1, 0],
           [0, 4, 0, 9, 0, 0, 0, 0, 0],
           [1, 0, 0, 0, 0, 0, 9, 0, 0],
           [0, 0, 0, 0, 2, 0, 0, 0, 7],
           [6, 0, 0, 5, 9, 0, 0, 4, 0]];
  $x = new SudokuSolver($s);
$zz = [1,2,3,4,5,6];
array_splice($zz, 2, 1);
var_dump($zz);

?>