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

## Implementation Plan

### 1. Core Components

- `server.py`: Main MCP server implementation
- `analytics.py`: Performance tracking and reporting
- `complexity.py`: Problem complexity estimation
- `examples.py`: Example database management
- `format.py`: Format enforcement and validation
- `reasoning.py`: Core reasoning logic (CoD and CoT)
- `client.py`: OpenAI-compatible client wrapper

### 2. Setup and Installation

1. Clone the repository
2. Install dependencies with `pip install -r requirements.txt`
3. Configure API keys in `.env` file
4. Run the server with `python server.py`

### 3. Usage

#### MCP Server Integration

Connect to the server from any MCP client (e.g., Claude Desktop) to access reasoning tools.

#### Python/TypeScript Integration

```python
from cod.client import ChainOfDraftClient

# Create client with OpenAI-compatible interface
cod_client = ChainOfDraftClient()

# Use directly in place of OpenAI client
response = await cod_client.chat(
    model="claude-3-5-sonnet-20240620",
    messages=[{"role": "user", "content": "Solve this math problem: 247 + 394 = ?"}],
    domain="math"
)

print(response['choices'][0]['message']['content'])
```

## Implementation Details

The server consists of several integrated services:

1. **AnalyticsService**: Tracks performance metrics across different problem domains and reasoning approaches.

2. **ComplexityEstimator**: Analyzes problems to determine appropriate word limits.

3. **ExampleDatabase**: Manages and retrieves examples, transforming CoT examples to CoD format.

4. **FormatEnforcer**: Ensures reasoning steps adhere to word limits.

5. **ReasoningSelector**: Intelligently chooses between CoD and CoT based on problem characteristics.

6. **ChainOfDraftClient**: Provides OpenAI-compatible interfaces for easy integration.

All these components are integrated into an MCP server that exposes reasoning tools through the Model Context Protocol.