# Chain of Draft (CoD) MCP Server

## Overview

This MCP server implements the Chain of Draft (CoD) reasoning approach as described in the research paper "Chain of Draft: Thinking Faster by Writing Less". CoD is a novel paradigm that allows LLMs to generate minimalistic yet informative intermediate reasoning outputs while solving tasks, significantly reducing token usage while maintaining accuracy.

## Key Benefits

- **Efficiency**: Significantly reduced token usage (as little as 7.6% of standard CoT)
- **Speed**: Faster responses due to shorter generation time
- **Cost Savings**: Lower API costs for LLM calls
- **Maintained Accuracy**: Similar or even improved accuracy compared to CoT
- **Flexibility**: Applicable across various reasoning tasks and domains

## Features

1. **Core Chain of Draft Implementation**
   - Concise reasoning steps (typically 5 words or less)
   - Format enforcement
   - Answer extraction

2. **Performance Analytics**
   - Token usage tracking
   - Solution accuracy monitoring
   - Execution time measurement
   - Domain-specific performance metrics

3. **Adaptive Word Limits**
   - Automatic complexity estimation
   - Dynamic adjustment of word limits
   - Domain-specific calibration

4. **Comprehensive Example Database**
   - CoT to CoD transformation 
   - Domain-specific examples (math, code, biology, physics, chemistry, puzzle)
   - Example retrieval based on problem similarity

5. **Format Enforcement**
   - Post-processing to ensure adherence to word limits
   - Step structure preservation
   - Adherence analytics

6. **Hybrid Reasoning Approaches**
   - Automatic selection between CoD and CoT
   - Domain-specific optimization
   - Historical performance-based selection

7. **OpenAI API Compatibility**
   - Drop-in replacement for standard OpenAI clients
   - Support for both completions and chat interfaces
   - Easy integration into existing workflows

## Setup and Installation

### Prerequisites
- Python 3.10+
- Anthropic API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Configure API keys in `.env` file:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```
4. Run the server:
   ```bash
   python server.py
   ```

## Claude Desktop Integration

To integrate with Claude Desktop:

1. Install Claude Desktop from [claude.ai/download](https://claude.ai/download)
2. Create or edit the Claude Desktop config file:
   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```
3. Add the server configuration:
   ```json
   {
       "mcpServers": {
           "chain-of-draft": {
               "command": "python3",
               "args": ["/absolute/path/to/cod/server.py"],
               "env": {
                   "ANTHROPIC_API_KEY": "your_api_key_here"
               }
           }
       }
   }
   ```
4. Restart Claude Desktop

## Available Tools

The Chain of Draft server provides the following tools:

| Tool | Description |
|------|-------------|
| `chain_of_draft_solve` | Solve a problem using Chain of Draft reasoning |
| `math_solve` | Solve a math problem with CoD |
| `code_solve` | Solve a coding problem with CoD |
| `logic_solve` | Solve a logic problem with CoD |
| `get_performance_stats` | Get performance stats for CoD vs CoT |
| `get_token_reduction` | Get token reduction statistics |
| `analyze_problem_complexity` | Analyze problem complexity |

## Developer Usage

If you want to use the Chain of Draft client directly in your Python code:

```python
from client import ChainOfDraftClient

# Create client 
cod_client = ChainOfDraftClient()

# Use directly
result = await cod_client.solve_with_reasoning(
    problem="Solve: 247 + 394 = ?",
    domain="math"
)

print(f"Answer: {result['final_answer']}")
print(f"Reasoning: {result['reasoning_steps']}")
print(f"Tokens used: {result['token_count']}")
```

## Implementation Details

The server consists of several integrated components:

1. **AnalyticsService**: Tracks performance metrics across different problem domains and reasoning approaches
2. **ComplexityEstimator**: Analyzes problems to determine appropriate word limits
3. **ExampleDatabase**: Manages and retrieves examples, transforming CoT examples to CoD format
4. **FormatEnforcer**: Ensures reasoning steps adhere to word limits
5. **ReasoningSelector**: Intelligently chooses between CoD and CoT based on problem characteristics

## License

This project is open-source and available under the MIT license.